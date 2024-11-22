import carla
import numpy as np
import time

# Algoritmo Stanley
def stanley_control(x, y, yaw, v, path_x, path_y, k=2.0):
    # Encuentra el punto más cercano en la trayectoria
    dx = [x - ix for ix in path_x]
    dy = [y - iy for iy in path_y]
    d = np.hypot(dx, dy)
    target_index = np.argmin(d)
    e_lat = d[target_index]
    
    # Orientación de la trayectoria
    path_yaw = np.arctan2(path_y[target_index] - y, path_x[target_index] - x)
    theta_e = path_yaw - yaw
    theta_e = np.arctan2(np.sin(theta_e), np.cos(theta_e))  # normaliza el ángulo

    # Ley de control Stanley
    delta = theta_e + np.arctan2(k * e_lat, v)
    return delta, target_index

# Función principal para conectarse a CARLA y ejecutar el algoritmo Stanley
def main():
    client = carla.Client('localhost', 2000)
    client.set_timeout(2.0)
    world = client.get_world()

    # Configuración de actor (vehículo)
    blueprint_library = world.get_blueprint_library()
    vehicle_bp = blueprint_library.filter('model3')[0]
    spawn_point = world.get_map().get_spawn_points()[0]
    vehicle = world.spawn_actor(vehicle_bp, spawn_point)

    # Configuración de control del vehículo
    vehicle.set_autopilot(False)

    # Configuración de la trayectoria deseada (una línea recta en este ejemplo)
    path_x = np.linspace(0, 50, num=100)  # camino recto en x
    path_y = np.zeros(100)  # camino recto en y

    try:
        while True:
            # Obtener información de la posición y orientación del vehículo
            transform = vehicle.get_transform()
            x = transform.location.x
            y = transform.location.y
            yaw = np.deg2rad(transform.rotation.yaw)  # convertir de grados a radianes
            v = vehicle.get_velocity()
            speed = np.sqrt(v.x**2 + v.y**2)  # velocidad en m/s

            # Aplicar el algoritmo Stanley
            delta, _ = stanley_control(x, y, yaw, speed, path_x, path_y)

            # Controlar el vehículo
            control = carla.VehicleControl()
            control.steer = np.clip(delta, -1.0, 1.0)  # limitar el ángulo de dirección
            control.throttle = 0.5  # se puede ajustar según la necesidad

            vehicle.apply_control(control)

            time.sleep(0.05)  # pequeño retardo para evitar sobrecargar el simulador

    finally:
        vehicle.destroy()
        print("Vehículo destruido y conexión con CARLA finalizada.")

if __name__ == '__main__':
    main()
