# 📦 Guía de Despliegue en AWS EC2

Este documento describe los pasos para desplegar la aplicación de gestión de repuestos de vehículos en una instancia EC2 con Docker.

---

## 🖥️ Requisitos Previos

- Cuenta de AWS
- Par de llaves `.pem` para acceso SSH
- Repositorio clonado: [GitHub - app-distribuida-gestion-repuestos-vehiculos](https://github.com/damontenegro/app-distribuida-gestion-repuestos-vehiculos)
- Repositorio DockerHub con las imágenes necesarias

---

## 🚀 Paso 1: Lanzar una Instancia EC2

1. Iniciar sesión en AWS Console.
2. Ir a EC2 → “Launch Instance”.
3. Configurar:
   - Amazon Linux 2
   - Tipo de instancia: t2.micro
   - Asignar Elastic IP
   - Crear y asociar un Security Group que permita:
     - Puerto 22 (SSH)
     - Puerto 80 (HTTP)
     - Puerto 3000 (Frontend React)
     - Puerto 5000 (Backend Node.js)

---

## 🔑 Pao 2: Conectarse a la instancia

```bash
ssh -i "mi-clave.pem" ec2-user@<elastic-ip>

## paso 3: 🐳 Paso 3: Instalar Docker y Docker Compose


sudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user


 Cierra la sesión y vuelve a entrar para que se apliquen los permisos de Docker.


🔧 Instalar Docker Compose

sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

## 📥 Paso 4: Clonar el repositorio desde GitHub


git clone https://github.com/damontenegro/app-distribuida-gestion-repuestos-vehiculos.git
cd app-distribuida-gestion-repuestos-vehiculos


## ⚙️ Paso 5: Ejecutar la aplicación con Docker Compose

docker-compose up -d --build

🧪 
##Verificación

Visitar: http://<elastic-ip>:3000 → Interfaz React

Backend: http://<elastic-ip>:5000/api/repuestos → API RESTful

##🧼 Paso 6: Parar los contenedores

docker-compose down



👥 Autores
Daniel Montenegro

Paola Vega
