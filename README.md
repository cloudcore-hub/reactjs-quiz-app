# Kubernetes DevSecOps CICD Project Using Github Actions and ArgoCD

## Video Tutorial

For a comprehensive guide on deploying and managing cloud-native applications using AWS, Kubernetes, and DevSecOps tools, watch the detailed tutorial:

[![Master Three-Tier Application | A Complete DevSecOps Guide on AWS with Kubernetes, GitOps & ArgoCD](http://img.youtube.com/vi/EVG51U3VcYs/0.jpg)](https://www.youtube.com/watch?v=EVG51U3VcYs "Mastering Cloud-Native Applications: A Complete DevSecOps Guide on AWS with Kubernetes")

Click on the image above to watch the video.

![gif2](https://github.com/cloudcore-hub/reactjs-quiz-app/assets/88560609/a0dfce93-3bde-45af-b82a-d7c9e2c47294)

- [Step 1: SSH Exchange between local computer and Github account.](#step-1-ssh-exchange-between-local-computer-and-github-account)
- [Step 2: CREATE AWS Resources.](#step-2-create-aws-resources)
- [Step 3: Install Terraform & AWS CLI.](#step-3-install-terraform--aws-cli)
- [Step 4: Deploy the Jumphost Server(EC2) using Terraform on Github Actions.](#step-4-deploy-the-jumphost-server-ec2-using-terraform-on-github-actions)
- [Step 5: Configure the Jumphost.](#step-5-configure-the-jumphost)
- [Step 6: Setup Docker Repositories to allow image push for Frontend & Backend images.](#step-6-setup-docker-repositories-to-allow-image-push-for-frontend--backend-images)
- [Step 7: Configure Sonar Cloud for our app_code Pipeline.](#step-7-configure-sonar-cloud-for-our-app_code-pipeline)
- [Step 8: Setup Synk Token for the app code pipeline.](#step-8-setup-synk-token-for-the-app-code-pipeline)
- [Step 9: Review and Deploy Application Code.](#step-9-review-and-deploy-application-code)
- [Step 10: Configure ArgoCD.](#step-10-configure-argocd)
- [Step 11: Set up the Monitoring for our EKS Cluster using Prometheus and Grafana.](#step-11-set-up-the-monitoring-for-our-eks-cluster-using-prometheus-and-grafana)
- [Step 12: Deploy Quiz Application using ArgoCD.](#step-12-deploy-quiz-application-using-argocd)
- [Step 13: Creating an A-Record in AWS Route 53 Using ALB DNS.](#step-13-creating-an-a-record-in-aws-route-53-using-alb-dns)
- [Step 14: Clean up.](#step-14-clean-up)
- [Conclusion](#conclusion)


### Project Introduction:
Welcome to the End-to-End DevSecOps Kubernetes Project guide! In this comprehensive project, we will walk through the process of setting up a robust Three-Tier architecture on AWS using Kubernetes, DevOps best practices, and security measures. This project aims to provide hands-on experience in deploying, securing, and monitoring a scalable application environment.

### Project Overview:
In this project, we will cover the following key aspects:

1. IAM User Setup: Create an IAM user on AWS with the necessary permissions to facilitate deployment and management activities.
2. Infrastructure as Code (IaC): Use Terraform and AWS CLI to set up the Jumphost server (EC2 instance) on AWS.
3. Github Actions Configuration: configure essential githubt actions on Github Actions workflow, including Snyk, Docker, Sonarqube, Terraform, Kubectl, AWS CLI, and Trivy.
4. EKS Cluster Deployment: Utilize eksctl commands to create an Amazon EKS cluster, a managed Kubernetes service on AWS.
5. Load Balancer Configuration: Configure AWS Application Load Balancer (ALB) for the EKS cluster.
6. Dockerhub Repositories: Automatically Create repositories for both frontend and backend Docker images on Dockerhub.
7. ArgoCD Installation: Install and set up ArgoCD for continuous delivery and GitOps.
8. Sonarqube Integration: Integrate Sonarqube for code quality analysis in the DevSecOps pipeline.
9. Snyk Integration: Integrate Snyk for vulnerability scanning and dependency management analysis in the DevSecOps pipeline.
10. Trivy Integration: Integrate Trivy for container image and filesystem vulnerability scanning in the DevSecOps pipeline.
11. Github Action Pipelines: Create Github Action pipelines for deploying backend and frontend code to the EKS cluster.
12. Monitoring Setup: Implement monitoring for the EKS cluster using Helm, Prometheus, and Grafana.
13. ArgoCD Application Deployment: Use ArgoCD to deploy the Three-Tier application, including database, backend, frontend, and ingress components.
14. DNS Configuration: Configure DNS settings to make the application accessible via custom subdomains.
15. Data Persistence: Implement persistent volume and persistent volume claims for database pods to ensure data persistence.
16. Conclusion and Monitoring: Conclude the project by summarizing key achievements and monitoring the EKS cluster’s performance using Grafana.

### Prerequisites:
Before starting this project, ensure you have the following prerequisites:

- An AWS account with the necessary permissions to create resources.
- Terraform and AWS CLI installed on your local computer.
- Basic familiarity with Kubernetes, Docker, CICD pipelines, Github Actions, Terraform, and DevOps principles.

### Step 1: SSH Exchange between local computer and Github account
**cd** to home dir and create **.ssh** folder if it doesn't exist 

```
cd ~/.ssh
ssh-keygen
```
![Screenshot 2024-02-28 at 9 22 06 AM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/6fdcda62-9178-45c2-a1d6-bc7cf778cd78)


Give the key a name **key**. Then list **ls** the content of .ssh/ folder.

Copy the content of the public key
```
cat key.pub
```

Go to the Settings of your Github account from profile section.
Go to Access Section on the left **SSH and GPG Keys** and **New SSH key**. Give a title and paste the content of key.pub

![Screenshot 2024-02-28 at 9 27 39 AM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/9cfbd7f0-27f9-4180-b5e1-a18e2eb8386f)


Back to the computer terminal and run the command
```
export GIT_SSH_COMMAND="ssh -i ~/.ssh/key"
```
Create a project folder in your **Desktop** or anywhere you'd prefer

```
mkdir ~/Desktop/project && cd ~/Desktop/project
```
#### Git Clone the application code and IaC repositories 
```
git clone https://github.com/cloudcore-hub/reactjs-quiz-app.git
```
```
git clone https://github.com/cloudcore-hub/iac_code.git
```
```
cd iac_code
git config core.sshCommand "ssh -i ~/.ssh/key -F /dev/null"
```
```
cd ..
cd reactjs-quiz-app
git config core.sshCommand "ssh -i ~/.ssh/key -F /dev/null"
```
![Screenshot 2024-02-28 at 9 34 55 AM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/20b80975-9212-4fe8-95cf-4d1b63317665)


#### Connect the repository to your Github

1. **Create a New Repository on GitHub:**
   - Go to GitHub and sign in.
   - Go to your profile and open Your repositories
   - Click the **New** icon in the top-right corner to create new repository.


![Screenshot 2024-02-28 at 9 38 08 AM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/815b0603-14ab-42fd-9756-3d8484909740)

   - Name your repository **iac**, set it to public or private, and click "Create repository."

![Screenshot 2024-02-28 at 9 40 08 AM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/790b34f0-8a92-47dd-992c-b47359884f48)

2. **Change the Remote URL of Your Local Repository:**
   - Open your terminal and navigate to the root directory of your local repository.
   - Check the current remote URL with:
     ```
     cd iac_code
     git remote -v
     ```
   - Change the remote URL to your newly created repository with:
     ```
     git remote set-url origin <YOUR_NEW_REPOSITORY_URL>
     ```
     Replace **YOUR_NEW_REPOSITORY_URL** with the URL of your new GitHub repository, like **https://github.com/yourusername/yourrepositoryname.git**.

![Screenshot 2024-02-28 at 9 43 51 AM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/0e2959bb-d704-4c2e-a84d-4363d0364711)


3. **Push Your Code to the New Repository:**
   - Ensure all your changes are committed. If you have uncommitted changes, add them using:
     ```
     git add .
     ```
   - Commit the changes with:
     ```
     git commit -m "Initial commit"
     ```
   - Push the code to your new repository with:
     ```
     git push -u origin master
     ```
     If your main branch is named differently (e.g., **main**), replace **master** with the correct branch name.

4. **Verify the Push:**
   - Refresh the GitHub page of your repository to see if the code has been pushed successfully.

5. **Repeat for the second repo:**  
   - You can name the second repo **reactjs** for simplicity

When done, run the following command in your terminal

```
git config --global user.name <your github user name>
git config --global user.email <your github email>
```

### Step 2: CREATE AWS Resources
#### Create an IAM user and generate the AWS Access key
Create a new IAM User on AWS and give it the AdministratorAccess for testing purposes (not recommended for your Organization's Projects)
Go to the AWS IAM Service and click on Users.

![Screenshot 2024-02-28 at 9 47 35 AM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/a60e8c35-2547-46aa-89be-11f1b97bfd12)


Click on Create user

![Screenshot 2024-02-28 at 9 48 36 AM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/be98197b-79d3-43eb-9999-a178dd8346fc)


Provide the name to your user and click on Next.

Select the Attach policies directly option and search for AdministratorAccess then select it.

![Screenshot 2024-02-28 at 9 49 18 AM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/0a72f551-2f90-447d-9ba0-1784b8a937c5)

Click on Next.

![Screenshot 2024-02-28 at 9 49 49 AM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/318f6640-5346-41e1-bcde-f7efdf73e2fb)

Click on Create user

![Screenshot 2024-02-28 at 9 50 05 AM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/d9dc1a65-de40-4d74-a311-089638b5cc58)

Now, Select your created user then click on **Security credentials** and generate access key by clicking on Create access key.

![Screenshot 2024-02-28 at 9 50 16 AM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/28d6572c-1d0f-4877-a8af-f3ccfbfaaba5)



Select the **Command Line Interface (CLI)** then select the checkmark for the confirmation and click on Next.

![Screenshot 2024-02-28 at 9 50 28 AM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/cab6e1b5-bc3a-40cf-b09d-d11db190bd81)



Provide the Description and click on the Create access key.

Here, you will see that you got the credentials and also you can download the CSV file for the future. Copy the Access Key ID and the Access Secret Key

![Screenshot 2024-02-28 at 9 50 48 AM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/283cc9fb-31d7-4220-93b3-15d93cb45b4f)


#### Create Github Repo Secret for iac
1. **Navigate to Your GitHub Repository created in step 1:**
   - Find and click on the iac repository where you want to add a secret.

2. **Access the Repository Settings:**
   - Click on the "Settings" tab near the top of the repository page.

![Screenshot 2024-02-28 at 9 54 15 AM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/c56ffcbe-07ba-42d3-aa42-ee984571064b)


3. **Open the Secrets Section:**
   - On the left sidebar, click on "Secrets and variables."
   - Then select "Actions" to add a secret available to GitHub Actions.

4. **Add a New Secret:**
   - Click on the "New repository secret" button.
   - Enter the name of your secret in the "Name" field. Use **AWS_ACCESS_KEY_ID**.
   - Enter the value of your secret in the "Value" field. 

5. **Save the Secret:**
   - Click the "Add secret" button to save your new secret.
   - The secret is now stored securely and can be accessed in GitHub Actions workflows using the **${{ secrets.AWS_ACCESS_KEY_ID }}** syntax, where **AWS_ACCESS_KEY_ID** is the name you gave your secret. Do same for the **AWS_SECRET_ACCESS_KEY**, add the Secret and save

![Screenshot 2024-02-28 at 9 55 10 AM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/17093658-686c-457e-8a1d-b4004b7e9986)


6. **Repeat 1-5 for app code repository:**

#### Create S3 Bucket for Terraform State files 
Create S3 bucket for the terraform state file. Add the bucket name in the iac_code repo secret. Name: **BUCKET_TF**, Value: **<your-bucket-name>**

![Screenshot 2024-02-28 at 9 58 13 AM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/47797825-5ca9-4564-841b-b8a30c77ddac)


#### Create key pair 
Create key pair for SSHing into the jumphost in .pem format and download it in your local machine

![Screenshot 2024-02-28 at 9 59 26 AM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/03b85d83-6c8d-4047-9fc0-12a16fe48410)

### Step 3: Install Terraform & AWS CLI
Install & Configure Terraform and AWS CLI on your local machine 

#### Terraform Installation Script for WSL
```
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg - dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update
sudo apt install terraform -y
```

#### AWSCLI Installation Script
```
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
sudo apt install unzip -y
unzip awscliv2.zip
sudo ./aws/install
```
Now, Configure both the tools

#### Terraform and AWSCLI Installation on MacOS
```
brew install terraform
brew install awscli
```

#### Configure AWS CLI

Run the below command, and add your keys from Step 2

```
aws configure
```

![Screenshot 2024-02-28 at 10 01 14 AM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/fe83607f-5325-4903-a1ed-ded5a85848f2)


### Step 4: Deploy the Jumphost Server(EC2) using Terraform on Github Actions
```
cd ~/Desktop/project/iac_code
```
Open the folder in Visual Studio Code or any Text Editor 
Navigate to the terraform folder

Do some modifications to the **terraform.tf** file such as changing the bucket name (make sure you have created the bucket manually on AWS console). 

![Screenshot 2024-03-13 at 1 57 56 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/9f581c1c-7fbe-4359-9f33-1dc198810383)


Now, in the **variables.tf** you can change some of the variable **region**, **vpc-name**, **ami_id**, **instance_type**, but you must replace the **instance_keypair** with the Pem File name as you have for your Pem file. Provide the Pem file name that is already created on AWS.

![Screenshot 2024-03-13 at 1 59 18 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/41747c40-8efe-4e02-aacb-28ce1415a8ec)


Review **.github/workflows/terraform.yml**

```
git commit -am "updated terraform files"
git push
```
With the couple of changed made in the terraform/ folder. 
Github Actions workflow will be trigger. 
Go to the repo on Github abd click on the Actions button to the see the Github Action workflow running.

Go to the EC2 on AWS Console
Now, connect to your Jumphost-Server by clicking on Connect.

![Screenshot 2024-02-28 at 11 58 41 AM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/8c74285d-ea47-464b-aa1b-250cdbf2baf0)

Copy the ssh command and paste it on your local machine.
Be sure you are in the same folder where your key pair is saved or provide the path to the key. For first time use incase of file permission error, run 
```
chmod 400 key.pem
```

![Screenshot 2024-02-28 at 11 58 56 AM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/677ae172-64bc-4a1d-b1a5-10624a012092)

and try SSHing again

![Screenshot 2024-02-28 at 1 25 31 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/e8c03910-6f3e-4032-8e54-10eac073b7f6)


### Step 5: Configure the Jumphost
We have installed some services such as Docker, Terraform, Kubectl, eksctl, AWSCLI, Trivy

Validate whether all our tools are installed or not.
```
docker --version
docker ps
terraform --version
kubectl version
aws --version
trivy --version
eksctl version
```

![Screenshot 2024-02-28 at 1 29 29 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/45eb2088-ab34-4a0d-ad08-0ebe7a30dd29)


#### Create an eks cluster using the below commands.
This might take 15-20 minutes. Also adjust the node count 
```
eksctl create cluster --name quizapp-eks-cluster --region us-east-1 --node-type t2.large --nodes-min 2 --nodes-max 4
```

![Screenshot 2024-02-28 at 2 51 37 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/2cea7f67-7d6a-445c-9863-e19bccf580e2)


Run the command below to connect to the EKS cluster created  allowing Kubernetes operations on that cluster.
```
aws eks update-kubeconfig --region us-east-1 --name quizapp-eks-cluster
```

Once the cluster is created, you can validate whether your nodes are ready or not by the below command

```
kubectl get nodes
```

#### Configure Load Balancer on the EKS
Configure the Load Balancer on our EKS because our application will have an ingress controller.
Download the policy for the LoadBalancer prerequisite.

```
curl -O https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.5.4/docs/install/iam_policy.json
```
#### Create IAM policy
Create the IAM policy using the below command
```
aws iam create-policy --policy-name AWSLoadBalancerControllerIAMPolicy --policy-document file://iam_policy.json
```
#### Create OIDC Provider
To allows the cluster to integrate with AWS IAM for assigning IAM roles to Kubernetes service accounts, enhancing security and management.
```
eksctl utils associate-iam-oidc-provider --region=us-east-1 --cluster=quizapp-eks-cluster --approve
```
#### Create Service Account 
Add your aws 12-digit account ID
```
eksctl create iamserviceaccount --cluster=quizapp-eks-cluster --namespace=kube-system --name=aws-load-balancer-controller --role-name AmazonEKSLoadBalancerControllerRole --attach-policy-arn=arn:aws:iam::<ACCOUNT-ID>:policy/AWSLoadBalancerControllerIAMPolicy --approve --region=us-east-1
```

![Screenshot 2024-02-28 at 2 56 12 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/6bb969ac-1118-482a-8b4c-bf5e9ecd8260)

Run the below command to deploy the AWS Load Balancer Controller using Helm

```
sudo snap install helm --classic
helm repo add eks https://aws.github.io/eks-charts
helm repo update eks
helm install aws-load-balancer-controller eks/aws-load-balancer-controller -n kube-system --set clusterName=quizapp-eks-cluster --set serviceAccount.create=false --set serviceAccount.name=aws-load-balancer-controller
```

Wait for 2 minutes and run the following command below to check whether aws-load-balancer-controller pods are running or not.
```
kubectl get deployment -n kube-system aws-load-balancer-controller
```



### Step 6: Setup Docker Repositories to allow image push for  Frontend & Backend images
Sign in into your Dockerhub Account

#### Create Docker Secret
Go to Dockerhub page, click on your profile and select My Account.
Then go to Security and click on New Access Token. Give it a name in the Access Token Description and Generate. Copy the token and add to **app** repo secrets, name it **DOCKER_PASSWORD** and paste the docker generated token. Also add another secret name it **DOCKER_USERNAME** and paste your dockerhub account username


![Screenshot 2024-02-28 at 10 58 48 AM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/e7087161-6959-4939-9524-4543bdc24b12)


### Step 7: Configure Sonar Cloud for our app_code Pipeline
Sonar cloud will be using for Code Quality Analysis of our application code.

#### 1. Create a SonarCloud Account

- Go to [SonarCloud](https://sonarcloud.io/) and click on **Sign up**.
- Choose the option to sign up using GitHub, Bitbucket, or GitLab.
- Follow the prompts to authorize SonarCloud to access your account.

![Screenshot 2024-02-28 at 1 09 48 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/34606711-c812-4eec-9cbc-696719fd60c9)

#### 2. Create a New Public Organization


![Screenshot 2024-02-28 at 1 10 14 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/156b1b9e-d956-4230-9008-6cd92768b834)

- Once logged in, go to **+** (top-right corner) and select **Create new organization**.
- Choose the service where your code is hosted (GitHub, Bitbucket, GitLab).
- Follow the on-screen instructions to select your account and set up a new organization.
- Choose **Public** for the organization’s visibility.

![Screenshot 2024-02-28 at 1 10 52 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/5323ca56-5186-4cd9-b8ac-1e665244876c)


#### 3. Create a Project

- In your new organization, click on **+** and select **Analyze new project**. Enter name and key. Then clikc on previous version and save

![Screenshot 2024-02-28 at 1 13 06 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/e49fe740-1115-4579-b7ad-071a8de706bf)


#### 4. Create a Token

- Go to **My Account > Security**.
- Under **Tokens**, enter a name for your new token and click **Generate**.
- Save the generated token securely. You will use this token in your analysis commands or CI/CD configuration.

![Screenshot 2024-02-28 at 1 13 55 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/ddb8c15e-d9c4-41be-9e1a-0d3344d38f1c)


**Note**: Keep your token confidential and use it as per the instructions for analyzing your project, either locally using SonarScanner or through your CI/CD pipeline.


Copy this token to Github app code repository secret
Name: SONAR_TOKEN
secret: paste the sonarcloud token

Add another secret
Name: SONAR_ORGANIZATION
secret: enter your sonar cloud organization name created above 

Add another secret
Name: SONAR_PROJECT_KEY
secret: enter your sonar cloud project key

Add another secret
Name: SONAR_URL
secret: https://sonarcloud.io

### Step 8: Setup Synk Token for the app code pipeline 

#### 1. Sign Up for Snyk
- Visit the [Snyk website](https://snyk.io) and click on the "Sign Up" button.
- You can sign up using your GitHub, GitLab, Bitbucket account, or an email address.

#### 2. Verify Your Email
- If you signed up with an email, verify your email address by clicking on the verification link sent to your email.

#### 3. Log in to Your Snyk Account
- After verifying your email or signing up through a version control system, log in to your Snyk account.

#### 4. Generate a Snyk Token
- Navigate to the account settings or your profile settings.
- Look for the API tokens section.
- Click on **Generate Token** or **Create New Token.**
- Name your token and, if given the option, set the scopes or permissions for the token.
- Click **Generate** or **Create.**

#### 5. Secure Your Token
- Copy the generated token and keep it secure. Do not share your token in public places.

![Screenshot 2024-03-13 at 2 00 50 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/b4835533-5bef-4262-bf6c-e1c79fcf7941)

You can now use this token to authenticate and integrate Snyk with your projects or CI/CD pipelines.

Copy this token to Github app code repository secret
Name: SNYK_TOKEN
secret: paste the snyk token


### Step 9: Review and Deploy Application Code
Review the app code repo.
In your local terminal 
cd ~/Desktop/project/reactjs-quiz-app
Open the folder in Visual Studio Code

Update the kubernetes-manifest/ingress.yaml file with your DNS
Review .github/workflows/quizapp.yml file

![Screenshot 2024-03-13 at 2 02 14 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/b33b5756-ad82-437c-969a-5f178be1318e)

```
git commit -am "updated manifest files"
git push
```

### Step 10: Configure ArgoCD
Create the namespace for the EKS Cluster. In your jumphost server terminal 

```
kubectl create namespace quiz
kubectl get namespaces
```
or 
```
kubectl get ns
```

Now, we will install argoCD.
To do that, create a separate namespace for it and apply the argocd configuration for installation.

```
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/v2.4.7/manifests/install.yaml
```

![Screenshot 2024-02-28 at 3 03 47 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/c25bbb21-1a8f-4dee-8322-43603abcc3d8)


To confirm argoCD pods are running.
All pods must be running, to validate run the below command
```
kubectl get pods -n argocd
```


![Screenshot 2024-02-28 at 3 04 12 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/9985c1cc-f1e6-45c1-9c82-b906b21699a4)


Now, expose the argoCD server as LoadBalancer using the below command
```
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "LoadBalancer"}}'
```

![Screenshot 2024-02-28 at 3 05 00 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/0652828e-2f12-40fa-aee4-c8e140d8ffdb)


You can validate whether the Load Balancer is created or not by going to the AWS Console

![Screenshot 2024-02-28 at 3 05 47 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/b38cfd7f-ed09-4e2f-8ddb-3b0873eddd5e)


To access the argoCD, copy the LoadBalancer DNS and hit on your browser.

You will get a warning like the below snippet.

Click on Advanced.

![Screenshot 2024-02-28 at 3 06 33 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/7ecf0487-33a6-4c3e-a3dd-360840299180)


Click on the below link which is appearing under Hide advanced

![Screenshot 2024-02-28 at 3 06 57 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/64490e0c-3e57-4ff4-a7fe-5c59e0b0fbe8)



Now, we need to get the password for our argoCD server to perform the deployment.

To do that, we need a pre-requisite which is jq. This has already been Installed or you can install it using the command below.
```
sudo apt install jq -y
```

```
export ARGOCD_SERVER=`kubectl get svc argocd-server -n argocd -o json | jq --raw-output '.status.loadBalancer.ingress[0].hostname'`
export ARGO_PWD=`kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d`
echo $ARGO_PWD
```

![Screenshot 2024-02-28 at 3 15 28 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/fde544fa-f4c3-455f-bb05-6cfbc63f1acf)



Enter the username **admin** and password in argoCD and click on SIGN IN.

![Screenshot 2024-02-28 at 3 15 05 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/71740bd1-da78-44d5-b0b4-9bcb3bb78235)


Here is our ArgoCD Dashboard.


![Screenshot 2024-02-28 at 3 15 45 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/19758d15-162c-467b-8325-9eaf3ed2350d)


### Step 11: Set up the Monitoring for our EKS Cluster using Prometheus and Grafana. 
We can monitor the Cluster Specifications and other necessary things.

We will achieve the monitoring using Helm
Add all the helm repos, the prometheus, grafana repo by using the below command
```
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
```

![Screenshot 2024-02-28 at 3 20 12 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/bbd88405-2fbe-4d7d-9217-d95da035b767)


Install the prometheus
```
helm install prometheus prometheus-community/kube-prometheus-stack -n monitoring --create-namespace
```

![Screenshot 2024-02-28 at 3 20 38 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/55e2db6d-a268-4e86-814a-c9b77a73a07d)


Install the Grafana 
```
helm install grafana grafana/grafana -n monitoring --create-namespace
```

![Screenshot 2024-02-28 at 3 21 33 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/9461a2ab-df77-4399-b7f4-3180064dab91)


Get Grafana **admin** user password using:
```
kubectl get secret --namespace monitoring grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
```


Now, confirm the services using the below command
```
kubectl get svc -n monitoring
```

![Screenshot 2024-02-28 at 3 27 11 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/9fcf4f6b-3d50-418b-ab77-e56f8de2ae07)


Now, we need to access our Prometheus and Grafana consoles from outside of the cluster.

For that, we need to change the Service type from ClusterIP to LoadBalancer

Edit the prometheus-server service
```
kubectl edit svc prometheus-kube-prometheus-prometheus -n monitoring
```

Modification in the 48th line from ClusterIP to LoadBalancer

![Screenshot 2024-03-13 at 2 05 49 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/942b9888-021c-4c30-bf47-d4eb388a92d2)


Edit the Grafana service

```
kubectl edit svc grafana -n monitoring
```

Modification in the 39th line from ClusterIP to LoadBalancer


![Screenshot 2024-02-28 at 3 38 22 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/674c3273-0619-4927-b0d7-9c892999a594)


Now, if you list again the service then, you will see the LoadBalancers DNS names
```
kubectl get svc -n monitoring
```

![Screenshot 2024-02-28 at 3 39 14 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/5ddfcab1-8f81-4490-974f-f7c54b0ce73e)


You can also validate from AWS LB console.


![Screenshot 2024-02-28 at 3 39 57 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/445222b2-7571-483a-9192-eb1bf80d3fcc)


Now, access your Prometheus Dashboard
Paste the **Prometheus-LB-DNS:9090** in your browser and you will see something like this

![Screenshot 2024-02-28 at 4 56 39 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/14857129-604e-45a7-9340-587223ada7bb)


Click on Status and select Target.
You will see a lot of Targets

![Screenshot 2024-02-28 at 4 57 28 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/ca59877f-9e02-4eeb-828d-1eeecdc870bb)



Now, access your Grafana Dashboard
Copy the ALB DNS of Grafana and paste it into your browser.

![Screenshot 2024-02-28 at 4 58 44 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/8e8f2fba-99d5-435e-8eb0-fd192134bc24)


Get your **admin** user password by running:
```
kubectl get secret --namespace monitoring grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
```
![Screenshot 2024-02-28 at 5 03 27 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/36c327d4-fff6-4738-a09d-0e183abc0af8)


The username will be admin and the password will be from the command above for your Grafana LogIn.

![Screenshot 2024-02-28 at 5 04 48 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/ae12f520-d155-4e69-abb7-1d12d10020de)


Now, click on Data Source

![Screenshot 2024-02-28 at 5 06 21 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/ccc57528-5597-4fec-86b1-4076403c3060)


Select Prometheus


In the Connection, paste your **Prometheus-LB-DNS:9090**

If the URL is correct, then you will see a green notification/
Click on Save & test.


![Screenshot 2024-03-13 at 2 08 01 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/8d8988d5-b6dd-4f48-bf0c-055a796337c5)

Now, we will create a dashboard to visualize our Kubernetes Cluster Logs.
Click on Dashboard.

![Screenshot 2024-02-28 at 5 08 53 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/1b697dbb-bf45-4320-ad2d-4e9d3107441d)


Once you click on Dashboard. You will see a lot of Kubernetes components monitoring.

Let’s try to import a type of Kubernetes Dashboard.
Click on New and select Import


Provide 6417 ID and click on Load
Note: 6417 is a unique ID from Grafana which is used to Monitor and visualize Kubernetes Data


![Screenshot 2024-02-28 at 5 10 08 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/bdbd0d13-639a-4a32-bfd1-f986f1d5f090)


Select the data source that you have created earlier and click on Import.


![Screenshot 2024-02-28 at 5 10 35 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/92241060-176a-4bf1-afe4-742967850205)


Here, you go.
You can view your Kubernetes Cluster Data.
Feel free to explore the other details of the Kubernetes Cluster.

![Screenshot 2024-02-28 at 5 10 50 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/c1efb42e-ad49-41fa-a945-56efee7683ff)



### Step 12: Deploy Quiz Application using ArgoCD.

Configure the app_code github repository in ArgoCD.
Click on Settings and select Repositories

![Screenshot 2024-02-28 at 6 17 56 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/5062cc48-1e55-4b1a-80c0-19bcab0be15b)


Click on CONNECT REPO USING HTTPS

![Screenshot 2024-02-28 at 6 18 07 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/4115fc4b-15ad-4520-a5e8-2e698ed98eae)


Now, provide the repository name where your Manifests files are present.
Provide the username and GitHub Personal Access token if your repo is private and click on CONNECT.

![Screenshot 2024-02-28 at 6 26 11 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/7cb2b7a6-dc0c-482c-9cde-f3ad10bb5dd5)


If your Connection Status is Successful it means repository connected successfully.

![Screenshot 2024-02-28 at 6 26 55 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/701b6865-ed8a-4bc3-ae9b-e7382ffeafe4)


Now, we will create our application which will deploy the frontend, backend. database and ingress
Click on CREATE APPLICATION.

![Screenshot 2024-03-13 at 2 10 48 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/d6740e57-607c-4e93-9a3c-7fbf35ac21a0)



Provide the details as it is provided in the below snippet and scroll down.

![Screenshot 2024-03-13 at 2 09 55 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/aa61aea9-c835-4947-a21b-fce354730512)


Select the same repository that you configured in the earlier step.
In the Path, provide the location where your Manifest files are presented and provide other things as shown in the below screenshot.


![Screenshot 2024-03-13 at 2 13 00 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/3b1cceff-752c-4402-a23a-5ac024f93ba2)


Click on CREATE.


![Screenshot 2024-03-09 at 7 30 10 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/b8ee0f79-0528-464a-beec-cbbf7e544be8)


ArgoCD will deploy all the application in the kubernetes-manifest folder

![Screenshot 2024-03-09 at 7 10 37 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/f012af49-7a74-4f9d-8f5b-d0a7b6959493)

Deployment is synced and healthy 

![Screenshot 2024-03-13 at 2 16 57 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/31853ad3-bcec-4089-864d-abf3623d67de)


Once your Ingress application is deployed. It will create an Application Load Balancer
You can check out the load balancer named with k8s-ingress.

Now, Copy the ALB-DNS and go to your Domain Provider in this case AWS Route 53 is the domain provider.

![Screenshot 2024-02-28 at 6 42 29 PM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/f5d7bcee-8238-4298-aefd-e017763e426e)

### Step 13: Creating an A-Record in AWS Route 53 Using ALB DNS
Create A-records using DNS service in aws [Route53].
Follow these steps to create an A-record in AWS Route 53 that points to your Application Load Balancer (ALB).

#### 1: Open Route 53 Dashboard

In the search bar at the top, type "Route 53" and click on the Route 53 service to open the Route 53 dashboard.

#### 2: Select Hosted Zone

From the Route 53 dashboard, choose "Hosted zones" under the DNS management section. Then select the hosted zone where you want to add the A-record.

#### 3: Create Record

![Screenshot 2024-02-29 at 4 49 56 AM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/bd97eb50-1d3c-4bd3-af06-d45250a469b5)

- Click on the "Create record" button.
- In the "Record name" field, enter the subdomain or leave it blank for the root domain.
- For "Record type", select "A – Routes traffic to an IPv4 address and some AWS resources".
- In the "Value/Route traffic to" section, choose "Alias to Application and Classic Load Balancer".
- Select the region where your ALB is located.
- Choose the ALB (it's identified by its DNS name) from the dropdown.
- (Optional) Adjust the "Routing policy" and "Record ID" as needed.

![Screenshot 2024-02-29 at 4 53 37 AM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/b8f7bbc7-8605-428e-a7e9-c9fe95ae0357)

#### 4: Confirm and Create

Review your configurations and click on the "Create records" button to create your A-record.

By following these steps, you'll successfully create an A-record in AWS Route 53 that points to your Application Load Balancer, allowing you to route traffic from your domain to your ALB.
 

Share the quizapp.cloudcorehub.com

Note: I have created a subdomain quizapp.cloudcorehub.com

![Screenshot 2024-03-13 at 3 12 09 PM](https://github.com/cloudcore-hub/reactjs-quiz-app/assets/88560609/31d1a7b4-3270-4660-b369-5a8aa38c4355)

Logged into the simple quiz application 

![Screenshot 2024-03-13 at 3 12 35 PM](https://github.com/cloudcore-hub/reactjs-quiz-app/assets/88560609/be005a73-d401-4182-a357-14fee0347026)


More Grafana dashboard IDs to try 

| Dashboard                          | ID    |
|------------------------------------|-------|
| k8s-addons-prometheus.json         | 19105 |
| k8s-system-api-server.json         | 15761 |
| k8s-system-coredns.json            | 15762 |
| k8s-views-global.json              | 15757 |
| k8s-views-namespaces.json          | 15758 |
| k8s-views-nodes.json               | 15759 |
| k8s-views-pods.json                | 15760 |


For Global 

![Screenshot 2024-03-10 at 3 28 42 AM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/f32673e0-c9d3-4fc2-8734-365e8c66465d)


For Namespaces

![Screenshot 2024-03-10 at 3 31 16 AM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/38cfb038-d8af-42e8-96bd-5a19c4529202)


For Nodes 

![Screenshot 2024-03-10 at 3 32 51 AM](https://github.com/cloudcore-hub/Kubernetes-DevSecOps-CI-CD-Project/assets/88560609/1f646754-cc07-4175-b5d0-da663fd1249a)



### Step 14: Clean up 
From your jumphost server terminal run
```
eksctl delete cluster --name=quizapp-eks-cluster --region=us-east-1
```

In your iac_code terminal, 
cd into the terraform folder
run
```
terraform init -backend-config="bucket=cloudcore007"
```
and then 
```
terraform destroy -auto-approve
```

### Conclusion: 
In this comprehensive DevSecOps Kubernetes project, we successfully:

- Established IAM user and Terraform for AWS setup.
- Deployed Infrastructure on AWS using Github Actions and Terraform and, configured tools.
- Set up an EKS cluster, and configured a Load Balancer.
- Implemented monitoring with Helm, Prometheus, and Grafana.
- Installed and configured ArgoCD for GitOps practices.
- Created Github Action pipelines for CI/CD, deploying a three-tier architecture application.
- Ensured data persistence with persistent volumes and claims.

Stay connected on LinkedIn: LinkedIn Profile
Stay up-to-date with GitHub: GitHub Profile
Feel free to reach out to me, if you have any other queries.
Happy Coding!
