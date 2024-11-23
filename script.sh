#!/bin/bash

echo "Actualizando el sistema..."
sudo apt update && sudo apt upgrade -y

# Instalación de dependencias esenciales
echo "Instalando dependencias necesarias..."
sudo apt install -y software-properties-common wget

# Añadir PPA para controladores de Nvidia (si es necesario)
echo "Añadiendo PPA de controladores Nvidia..."
sudo add-apt-repository ppa:graphics-drivers/ppa -y
sudo apt update

# Instalación de paquetes
echo "Instalando kitty, terminator, nvidia-driver, feh, lightdm, rofi y firefox-esr..."

sudo apt install -y \
    kitty \
    terminator \
    nvidia-driver \
    feh \
    lightdm \
    rofi \
    firefox-esr
