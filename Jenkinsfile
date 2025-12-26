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
                sh 'npm test'
            }
        }
    }

   post {
    always {
        steps {
            echo 'Publishing Playwright reports and test results'

            junit allowEmptyResults: true,
                  testResults: 'reports/junit-results.xml'

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
    }

    success {
        steps {
            echo 'Playwright tests executed successfully'
        }
    }

    failure {
        steps {
            echo 'Playwright tests failed – check reports'
        }
    }
}
}