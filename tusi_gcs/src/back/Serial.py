import sys
import serial
from serial.tools import list_ports

class Serial:
    def __init__(self):
        self.ser = None
        self.ser_flag = False
        self.ser_init = False

    def getAvailablePort(self):
        available_ports = [port.device for port in list_ports.comports()]
        return available_ports


    def port_disconnect(self):
        self.ser.close()
        self.ser = None
        self.ser_flag = False

    def port_connect(self, port, baudrate):

            if self.ser_flag == True:
                self.port_disconnect()

            self.ser = serial.Serial(port=port,baudrate=baudrate,parity=serial.PARITY_NONE,stopbits=serial.STOPBITS_ONE,bytesize=serial.EIGHTBITS,timeout=1)
            self.ser_flag = True
            self.ser_init = True

    def getSerialSignal(self):
        if self.ser == None:
            return ["No data"]
        else:
            try:
                if self.ser.in_waiting > 0:
                    received_data = self.ser.readline().decode().strip()
                    data_list = received_data.split(",")
                    return data_list
                else:
                    return ["No data"]
            except:
                return ["No data"]
            
    
    def writeSerialSignal(self, data):
        print("data sending..../")
        if data == "stage":
            self.ser.write(b'StageChange\n') 
        elif data == "injection":
            self.ser.write(b'Injection')
            