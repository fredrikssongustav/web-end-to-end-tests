const Mocha = require('mocha');
const {PrometheusClient} = require('../metrics/prometheus-client');

const {
  EVENT_TEST_FAIL,
  EVENT_TEST_PASS,
} = Mocha.Runner.constants;

const prometheusClient = new PrometheusClient();

class PrometheusReporter {
  constructor(runner) {
    runner.on(EVENT_TEST_PASS, test => {
      console.log(`pass: ${test.fullTitle()}`);
      prometheusClient.postMetricsSuccessful(test.fullTitle());
    }).on(EVENT_TEST_FAIL, (test, err) => {
      console.log(
        `fail: ${test.fullTitle()} - error: ${err.message}`,
      );
      prometheusClient.postMetricsFailed(test.fullTitle());
    });
  }
}

module.exports = PrometheusReporter;