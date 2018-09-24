// An eslint Reporter class. Objects of the Reporter class need
// to have the methods listed below...
class Reporter {
  constructor(reports) {
    this.reports = reports
  }

  get errorCount() {
    return this._countReportsWith(Reporter.SEVERITY.ERROR)
  }

  get warningCount() {
    return this._countReportsWith(Reporter.SEVERITY.WARN)
  }

  _countReportsWith(severity) {
    return this.reports.filter(i => i.severity === severity).length
  }


  get messages() {
    return this.reports.sort((x1, x2) => x1.line - x2.line);
  }
}

Reporter.SEVERITY = Object.freeze({ ERROR: 2, WARN: 3 });

module.exports = Reporter;
