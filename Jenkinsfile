pipeline {
    agent {
        node {
            label 'agent'
        }
    }
    tools {
        nodejs 'NodeJS'
        dockerTool 'docker'
    }
    stages {
        stage ('Git Checkout') {
            steps {
                git branch: 'main', credentialsId: 'git-cred', url: 'https://github.com/crypticseeds/df-demo-app.git'
            }
        }
        stage ('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage ('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage ('Trivy fs Scan') {
            steps {
                sh 'trivy fs --format table -o fs-report.html .' 
            }
        }
        stage ('Sonaqube Scan') {
            steps {
                script {
                    def scannerHome = tool 'sonar-scanner' 
                    withSonarQubeEnv('sonar') {
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=df-demo-app -Dsonar.projectName=df-demo-app -Dsonar.sources=."
                    }
                }
            }
        }
        stage ('Build Docker Image & Tag') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker-cred') {
                        sh """
                            docker build -t crypticseeds/df-demo-app:latest -t crypticseeds/df-demo-app:v1.${BUILD_NUMBER} .
                        """
                    }
                }
            }
        }
        stage ('Trivy Image Scan') {
            steps {
                sh 'trivy image --format table --scanners vuln -o image-report.html crypticseeds/df-demo-app:latest'
            }
        }
        stage ('Push Docker Image') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker-cred') {
                        sh """
                            docker push crypticseeds/df-demo-app:latest
                            docker push crypticseeds/df-demo-app:v1.${BUILD_NUMBER}
                        """
                    }
                }
            }
        }
    }
}
