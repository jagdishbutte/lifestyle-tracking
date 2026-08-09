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

        // ===========================
        // Build Spring
        // ===========================

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                    sh "docker build -t ${BACKEND_IMAGE} ."
                }
            }
        }

        // ===========================
        // Build FastAPI
        // ===========================

        stage('Build AI') {
            steps {
                dir('ai-service') {
                    sh "docker build -t ${AI_IMAGE} ."
                }
            }
        }

        // ===========================
        // Push Images
        // ===========================

        stage('Push Images') {

            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'DockerHubCreds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {

                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

                        docker push ${BACKEND_IMAGE}
                        docker push ${AI_IMAGE}
                    '''
                }
            }
        }

        // ===========================
        // Deploy
        // ===========================

        stage('Deploy') {

            steps {

                withCredentials([
                    file(credentialsId: 'backend-env', variable: 'BACKEND_ENV'),
                    file(credentialsId: 'ai-env', variable: 'AI_ENV')
                ]) {

                    sh '''

                        cp "$BACKEND_ENV" backend.env
                        cp "$AI_ENV" ai.env

                        docker compose pull
                        docker compose up -d

                    '''
                }
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
    }
}