from flask import Flask, jsonify, request
import json
import Serial
import random
from threading import Thread
import time

app = Flask(__name__)
ser = Serial.Serial()
recieve_flag = False

gyro = [0.0,0.0,0.0] #roll, pitch, yaw
acc = [0.0,0.0,0.0]
altitude = [0.0]
gps = [0.0,0.0]

communication_state = [False, False, False, False]
stage = ["No signal"]

location_data = [37.239285, 127.086194]

def recieveData():
    global recieve_flag, ser, gyro, acc, altitude, gps, communication_state, stage
    while(recieve_flag):
        recieve_data = ser.getSerialSignal()

        if(recieve_data[0] == "Stage"):
            stage = [recieve_data[1]]
        if (recieve_data == "No data") or (len(recieve_data) != 9):
            communication_state = [False for i in range(4)]
            continue

        else:  
            try:
                print(recieve_data)
                communication_state = [True for i in range(4)]
                gyro[0:3] = recieve_data[0:3]
                acc[0:3] = recieve_data[3:6]
                
                if recieve_data[6] == " NAN":
                    altitude[0] = 0
                else:
                    altitude[0] = recieve_data[6]
                gps[0:2] = recieve_data[7:9]
                
                gyro = [float(element) for element in gyro]
                acc = [float(element) for element in acc]
                altitude[0] = float(altitude[0])
                location_data[0] = float(gps[0])
                location_data[1] = float(gps[1])
            except:
                print("wow")
                pass
recieveDataThread = None

@app.route('/getAvaliablePorts', methods=['GET'])
def getAvailablePorts():
    #연결 가능한 포트들을 반환 한다
    global ser
    availablePorts = ser.getAvailablePort()
    availablePorts.insert(0,"select")
    return {"ports": availablePorts}
           
@app.route('/connectPort', methods=['POST'])
def connectPort():
    global ser
    global recieveDataThread
    global recieve_flag
    request_data = request.get_json()
    if recieve_flag == True:
        recieve_flag = False
        recieveDataThread.join()
    ser.port_connect(request_data['port'], request_data['baudRate'])
    recieve_flag = True
    recieveDataThread = Thread(target=recieveData)
    recieveDataThread.start()
    print("wow")
    return "hello"


@app.route('/communicationState', methods=['GET'])
def communicationState():
    global communication_state
    return {"state": communication_state}


@app.route('/stage', methods=['GET'])
def getstage():
    global stage
    return {"state":stage}

@app.route('/getRocketState', methods=['GET'])
def getRocketState():
    global gyro, acc, altitude, gps
    state = [gyro, acc, altitude, gps]
    return {"state": state}

@app.route('/location', methods=['GET'])
def getLocation():
    global location_data
    location = {'lat': location_data[0], 'lng': location_data[1]}
    return {"location": location}


@app.route('/nextStage', methods = ['GET'])
def nextStage():
    global ser
    ser.writeSerialSignal("stage")
    return {"state" : "good"}

@app.route('/injection', methods = ['GET'])
def injection():
    global ser
    ser.writeSerialSignal("injection")
    return {"state" : "good"}

if __name__ == "__main__":
    app.run(debug = True)