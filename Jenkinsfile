pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "saivinayy1109"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Images') {
            steps {
                script {
                    docker.build("${DOCKERHUB_USER}/auth-service:${IMAGE_TAG}", "auth-service")
                    docker.build("${DOCKERHUB_USER}/product-service:${IMAGE_TAG}", "product-service")
                    docker.build("${DOCKERHUB_USER}/order-service:${IMAGE_TAG}", "order-service")
                    docker.build("${DOCKERHUB_USER}/api-gateway:${IMAGE_TAG}", "api-gateway")
                    docker.build("${DOCKERHUB_USER}/frontend-service:${IMAGE_TAG}", "frontend")
                }
            }
        }

        stage('Docker Login & Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push saivinayy1109/auth-service:${IMAGE_TAG}
                        docker push saivinayy1109/product-service:${IMAGE_TAG}
                        docker push saivinayy1109/order-service:${IMAGE_TAG}
                        docker push saivinayy1109/api-gateway:${IMAGE_TAG}
                        docker push saivinayy1109/frontend-service:${IMAGE_TAG}
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "CI Pipeline completed successfully ✅"
        }
        failure {
            echo "CI Pipeline failed ❌"
        }
    }
}
