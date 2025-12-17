pipeline {
    agent any

    environment {
        DOCKERHUB_CREDS = credentials('docker-hub-creds')
        DOCKERHUB_USER  = 'saivinayy1109'
        TAG = "${env.BUILD_NUMBER}"
    }

        stage('Build Images') {
            steps {
                script {
                    sh '''
                    docker build -t $DOCKERHUB_USER/auth-service:$TAG auth-service
                    docker build -t $DOCKERHUB_USER/product-service:$TAG product-service
                    docker build -t $DOCKERHUB_USER/order-service:$TAG order-service
                    docker build -t $DOCKERHUB_USER/api-gateway:$TAG api-gateway
                    docker build -t $DOCKERHUB_USER/frontend-service:$TAG frontend
                    '''
                }
            }
        }

        stage('Push Images') {
            steps {
                script {
                    sh '''
                    echo "$DOCKERHUB_CREDS_PSW" | docker login -u "$DOCKERHUB_CREDS_USR" --password-stdin
                    docker push $DOCKERHUB_USER/auth-service:$TAG
                    docker push $DOCKERHUB_USER/product-service:$TAG
                    docker push $DOCKERHUB_USER/order-service:$TAG
                    docker push $DOCKERHUB_USER/api-gateway:$TAG
                    docker push $DOCKERHUB_USER/frontend-service:$TAG
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "CI Pipeline completed successfully 🚀"
        }
        failure {
            echo "CI Pipeline failed ❌"
        }
    }
}
