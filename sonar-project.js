const sonarqubeScanner = require('sonarqube-scanner');
const parameters = {
    serverUrl:  'https://sonarqube.secoder.net/',
    //serverUrl:  'http://localhost:9000',
    token: 'XXX',
    options : {
        //'sonar.projectVersion': '1.1',
        'sonar.projectName': '81X86 NaiveCrowdFrontEnd',
        'sonar.projectKey': '81X86:NaiveCrowdFrontEnd',
        'sonar.sourceEncoding': 'UTF-8',
        //'sonar.scm.provider': 'git',
        'sonar.language': 'typescript',
        'sonar.sources': 'src',
        'sonar.inclusions': 'src/**',
        'sonar.exclusions': '**/node_modules/**,**/coverage/**',
        'sonar.tests': '__tests__',
        'sonar.ts.tslint.configPath': 'tslint.json',
        'sonar.test.inclusions': 'src/**/*.spec.ts,test/**/*.e2e-spec.ts',
        //'sonar.testExecutionReportPaths':  'coverage/test-reporter.xml',
        'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
        'sonar.login':'b97b060225e18b69e37f5a65d1f1b2f866a07382',
        //'sonar.password':'pd4imF0xluZ1',
        //'sonar.scm.provider':'2018013354@secoder.net',
        'sonar.scm.disabled':'true',
        'sonar.gitlab.user_token':'FyAtGKNs3giE5YL9Ydsz',
    }
}
sonarqubeScanner(parameters, () => process.exit());