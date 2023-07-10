import psutil
import socket
import time
import curses
import keyboard
import subprocess
import sys


event = None


def get_network_interfaces():
    interfaces = psutil.net_if_addrs()
    network_interfaces = []
    for interface, addresses in interfaces.items():
        for address in addresses:
            if address.family == socket.AF_INET:
                network_interfaces.append((interface, address.address))
    return network_interfaces


def select_options(stdscr, title, options):
    current_row = 0
    indexes = [str(index + 1) for index in range(len(options))]

    curses.cbreak()
    curses.noecho()
    stdscr.keypad(1)

    while True:
        stdscr.clear()
        stdscr.addstr(f"{title}:\n\n", curses.A_BOLD)
        # Exibe as opções
        for index, option in enumerate(options):
            if index == current_row:
                stdscr.attron(curses.color_pair(1))
                stdscr.addstr(f"{index + 1}. {option}\n")
                stdscr.attroff(curses.color_pair(1))
            else:
                stdscr.addstr(f"{index + 1}. {option}\n")

        stdscr.refresh()

        # Obtém a tecla pressionada (não bloqueante)
        event = keyboard.read_event(suppress=False)
        key = event.name
        stdscr.addstr(f"{key}\n")

        # Navega para cima
        if key == "up" and current_row > 0:
            current_row -= 1
        # Navega para baixo
        elif key == "down" and current_row < len(options) - 1:
            current_row += 1
        # Seleciona a opção atual
        elif key in indexes:
            current_row = int(key) - 1
        # Seleciona a opção atual
        elif key == "enter":
            while keyboard.is_pressed("enter"):
                time.sleep(0.1)
            break

        while keyboard.is_pressed("down") or keyboard.is_pressed("up"):
            time.sleep(0.1)

    return options[current_row]


def get_ip_address(interface):
    return interface[1]


def input(stdscr, title, message):
    stdscr.keypad(1)

    port = ""
    while True:
        stdscr.clear()
        stdscr.attron(curses.color_pair(1))
        stdscr.addstr(f"{title}\n\n")
        stdscr.attroff(curses.color_pair(1))
        stdscr.addstr(f"{message}: {port}")
        stdscr.refresh()

        event = keyboard.read_event(suppress=False)
        key = event.name

        if key == "enter":
            while keyboard.is_pressed("enter"):
                time.sleep(0.1)
            break
        elif key in ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]:
            if len(port) < 4:
                port += key
        elif key == "backspace":
            if len(port) > 0:
                port = port[:-1]

        while keyboard.is_pressed(key):
            time.sleep(0.1)

    stdscr.addstr('\n')
    return port


def main(stdscr):
    try:
        # Configuração inicial do terminal
        curses.curs_set(0)
        curses.init_pair(1, curses.COLOR_MAGENTA, curses.COLOR_BLACK)
        stdscr.nodelay(1)

        network_interfaces = get_network_interfaces()

        if network_interfaces:
            selected_interface = select_options(
                stdscr, "Selecione o host da aplicação", network_interfaces)
            ip_address = get_ip_address(selected_interface)

            script = sys.argv[1]

            curses.endwin()

            port = input(
                stdscr, f"Digite a porta de conexão: {selected_interface}", "porta de conexão (auto)")

            if port:
                command = f"npx next {script} -H {ip_address} -p {port}"
            else:
                command = f"npx next {script} -H {ip_address} -p 0"

            subprocess.call(command, shell=True)
        else:
            print("Não foram encontradas interfaces de rede.\n")
    except KeyboardInterrupt:
        pass


# Executa o programa
curses.wrapper(main)
