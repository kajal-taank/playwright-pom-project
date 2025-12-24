pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                  node -v
                  npm -v
                  npm install
                  npx playwright install --with-deps
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh '''
                  npx playwright test
                '''
            }
        }
    }

    post {
        always {
            echo 'Publishing Playwright reports and test results'

            // Publish JUnit results to Jenkins Test Result section
            junit 'test-results/**/*.xml'

            // Publish Playwright HTML report
            publishHTML(target: [
                reportName: 'Playwright HTML Report',
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                keepAll: true,
                alwaysLinkToLastBuild: true
            ])

            // Archive reports, screenshots, videos
            archiveArtifacts artifacts: '''
                playwright-report/**,
                test-results/**,
                **/test-results/**,
                **/*.png,
                **/*.webm
            ''', allowEmptyArchive: true
        }

        success {
            echo 'Playwright tests executed successfully'
        }

        failure {
            echo 'Playwright tests failed – check reports'
        }
    }
}
