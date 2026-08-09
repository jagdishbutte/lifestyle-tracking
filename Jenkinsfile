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

        stage('Detect Changes') {
            steps {
                script {

                    def changedFiles = ""

                    try {
                        changedFiles = sh(
                            script: "git diff --name-only HEAD~1 HEAD",
                            returnStdout: true
                        ).trim()
                    } catch (Exception e) {
                        echo "First build detected. Building everything."
                        env.BUILD_BACKEND = "true"
                        env.BUILD_AI = "true"
                        return
                    }

                    echo "Changed Files:\n${changedFiles}"

                    def files = changedFiles.tokenize("\n")

                    env.BUILD_BACKEND = files.any {
                        it.startsWith("backend/")
                    }.toString()

                    env.BUILD_AI = files.any {
                        it.startsWith("ai-service/")
                    }.toString()

                    def buildAll = files.any {
                        it == "docker-compose.yml" ||
                        it == "Jenkinsfile"
                    }

                    if (buildAll) {
                        env.BUILD_BACKEND = "true"
                        env.BUILD_AI = "true"
                    }

                    echo "BUILD_BACKEND = ${env.BUILD_BACKEND}"
                    echo "BUILD_AI = ${env.BUILD_AI}"
                }
            }
        }

        stage('Build Backend') {

            when {
                expression {
                    env.BUILD_BACKEND == "true"
                }
            }

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

            when {
                expression {
                    env.BUILD_AI == "true"
                }
            }

            steps {
                dir('ai-service') {
                    sh '''
                        docker build -t ${AI_IMAGE} .
                    '''
                }
            }
        }

        stage('Deploy') {

            when {
                expression {
                    env.BUILD_BACKEND == "true" ||
                    env.BUILD_AI == "true"
                }
            }

            steps {

                withCredentials([
                    file(credentialsId: 'backend-env', variable: 'BACKEND_ENV'),
                    file(credentialsId: 'ai-env', variable: 'AI_ENV')
                ]) {

                    sh '''
                        cp "$BACKEND_ENV" backend.env
                        cp "$AI_ENV" ai.env
                    '''

                    script {

                        if (env.BUILD_BACKEND == "true") {
                            sh "docker compose up -d backend"
                        }

                        if (env.BUILD_AI == "true") {
                            sh "docker compose up -d ai"
                        }
                    }
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