const client = require('prom-client');
const PUSHGATEWAY_URL = process.env.PROMETHEUS_PUSHGATEWAY_URL;

class PrometheusClient {
  constructor() {
    this.gateway = new client.Pushgateway(PUSHGATEWAY_URL);
    this.testGauge = new client.Gauge(
      {
        name: 'e2e-tests',
        help: 'A gauge for successful tests',
      });
    this.counterTests = new client.Counter({
      name: 'test_counter',
      help:
        'A counter for all tests',
    });
  }

  log(...args) {
    args.forEach(arg => {
      console.log(arg);
    });
    console.log('\n\n');
  };

  postMetricsSuccessful(testName) {
    this.counterTests.inc();
    this.testGauge.inc();

    this.gateway.pushAdd({
      jobName: 'test_gauge',
      groupings: {source: testName},
    }, (err, resp, body) => {
      if (err != null) {
        this.log('Pushing metrics failed', err);
      }
    });
  }

  postMetricsFailed(testName, error) {
    this.counterTests.inc();
    this.testGauge.dec();

    this.gateway.pushAdd({
      jobName: 'test_gauge',
      groupings: {source: testName, error: error},
    }, (err, resp, body) => {
      if (err != null) {
        this.log('Pushing metrics failed', err);
      }
    });
  }
}

module.exports = {
  PrometheusClient,
};
