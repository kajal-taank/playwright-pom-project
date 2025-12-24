pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh '''
                  node -v
                  npm -v
                  npm install
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh '''
                  npx playwright install --with-deps
                  npx playwright test
                '''
            }
        }
    }

    post {
        always {
            echo 'Archiving reports if present'
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
        }
    }
}
