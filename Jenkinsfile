pipeline {

    agent any

    environment {
        BACKEND_IMAGE = "jagdishbutte/lifestyle-backend:latest"
        AI_IMAGE = "jagdishbutte/lifestyle-ai:latest"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh '''
                        mvn clean package -DskipTests
                        docker build -t ${BACKEND_IMAGE} .
                    '''
                }
            }
        }

        stage('Build AI') {
            steps {
                dir('ai-service') {
                    sh '''
                        docker build -t ${AI_IMAGE} .
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {

                withCredentials([
                    file(credentialsId: 'backend-env', variable: 'BACKEND_ENV'),
                    file(credentialsId: 'ai-env', variable: 'AI_ENV')
                ]) {

                    sh '''
                        cp "$BACKEND_ENV" backend.env
                        cp "$AI_ENV" ai.env

                        docker compose up -d backend ai
                    '''
                }
            }
        }

        stage('Cleanup') {
            steps {
                sh '''
                    docker image prune -f
                '''
            }
        }
    }

    post {

        success {
            echo "Deployment Successful ✅"
        }

        failure {
            echo "Deployment Failed ❌"
        }

        always {
            cleanWs()
        }
    }
}