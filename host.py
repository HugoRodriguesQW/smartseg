import psutil
import socket
import time
import curses
import keyboard
import subprocess
import sys


def get_network_interfaces():
    interfaces = psutil.net_if_addrs()
    network_interfaces = []
    for interface, addresses in interfaces.items():
        for address in addresses:
            if address.family == socket.AF_INET:
                network_interfaces.append((interface, address.address))
    return network_interfaces


def select_interface(stdscr, interfaces):
    current_row = 0

    curses.cbreak()
    curses.noecho()
    stdscr.keypad(1)

    while True:
        stdscr.clear()
        stdscr.addstr("Selecione o host da aplicação:\n\n", curses.A_BOLD)
        # Exibe as opções de interface
        for index, (interface, _) in enumerate(interfaces):
            if index == current_row:
                stdscr.attron(curses.color_pair(1))
                stdscr.addstr(
                    f"{index}. {interface}: {get_ip_address(interfaces[index])}\n")
                stdscr.attroff(curses.color_pair(1))
            else:
                stdscr.addstr(
                    f"{index}. {interface}: {get_ip_address(interfaces[index])}\n")

        stdscr.refresh()

        # Obtém a tecla pressionada (não bloqueante)
        event = keyboard.read_event(suppress=False)
        key = event.name
        stdscr.addstr(f"{key}\n")

        # Navega para cima
        if key == "up" and current_row > 0:
            current_row -= 1
        # Navega para baixo
        elif key == "down" and current_row < len(interfaces) - 1:
            current_row += 1
        # Seleciona a opção atual
        elif key == "enter":
            break

        while keyboard.is_pressed("down") or keyboard.is_pressed("up"):
            time.sleep(0.1)

    return interfaces[current_row]


def get_ip_address(interface):
    return interface[1]


def main(stdscr):
    try:
        # Configuração inicial do terminal
        curses.curs_set(0)
        curses.init_pair(1, curses.COLOR_MAGENTA, curses.COLOR_BLACK)
        stdscr.nodelay(1)

        network_interfaces = get_network_interfaces()

        if network_interfaces:
            selected_interface = select_interface(stdscr, network_interfaces)
            ip_address = get_ip_address(selected_interface)

            curses.endwin()
            script = sys.argv[1]

            command = f"npx next {script} -H {ip_address}"
            subprocess.call(command, shell=True)
        else:
            print("Não foram encontradas interfaces de rede.\n")

    except KeyboardInterrupt:
        pass


# Executa o programa
curses.wrapper(main)
