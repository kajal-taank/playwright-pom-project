pipeline {
    agent any
    tools { nodejs 'NodeJS-20' }

    environment {
        USERNAME = credentials('Kajal_Taank')
        PASSWORD = credentials('Kajaltaank@12345')
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm-cache"
        PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}/.playwright"
    }

    stages {
        stage('Checkout Code') { steps { checkout scm } }
        stage('Install Dependencies') {
            steps {
                sh '''
                    node -v
                    npm -v
                    npm ci
                    npm run install:browsers
                '''
            }
        }
        stage('Run Playwright Tests') { steps { sh 'npm test' } }
    }

    post {
        always {
            echo 'Test Case always run'
            junit allowEmptyResults: true, testResults: 'reports/junit-results.xml'
            publishHTML(target: [
                reportName: 'Playwright HTML Report',
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                keepAll: true,
                alwaysLinkToLastBuild: true
            ])
            archiveArtifacts artifacts: '''
                reports/**,
                playwright-report/**,
                test-results/**,
                **/*.png,
                **/*.webm
            ''', allowEmptyArchive: true
        }
        success { echo 'Build succeeded' }
        failure { echo 'Build failed' }
    }
}
