pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'
    }

    environment {
        // Speed up npm installs
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm-cache"
        // Prevent Playwright from downloading browsers multiple times
        PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}/.playwright"
    }

    options {
        timestamps()
        disableConcurrentBuilds()
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
                  npm ci
                  npm run install:browsers
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh '''
                  npm test
                '''
            }
        }
    }

    post {
        always {
            echo 'Publishing Playwright reports and test results'

            // Publish JUnit results (safe if missing)
            junit allowEmptyResults: true,
                  testResults: 'reports/junit-results.xml'

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
                reports/**,
                playwright-report/**,
                test-results/**,
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
