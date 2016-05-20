import RPi.GPIO as GPIO #Import GPIO library 
import time #Import time library 
GPIO.setmode(GPIO.BCM) #Set GPIO pin numbering

TRIG = 23                                  #Associate pin 23 to TRIG
ECHO = 24                                  #Associate pin 24 to ECHO
STATUS = 12
print "Distance measurement in progress"

GPIO.setup(TRIG,GPIO.OUT)                  #Set pin as GPIO out
GPIO.setup(ECHO,GPIO.IN)                   #Set pin as GPIO in
GPIO.setup(STATUS,GPIO.OUT)
GPIO.output(STATUS,True)
while True:

  GPIO.output(TRIG, False)                 #Set TRIG as LOW
  print "Waiting For Sensor To Settle"
  time.sleep(2)                            #Delay of 2 seconds

  GPIO.output(TRIG, True)                  #Set TRIG as HIGH
  time.sleep(0.00001)                      #Delay of 0.00001 seconds
#  time.sleep(1)
  GPIO.output(TRIG, False)                 #Set TRIG as LOW

  while GPIO.input(ECHO)==0:               #Check whether the ECHO is LOW
    pulse_start = time.time()              #Saves the last known time of LOW pulse

  while GPIO.input(ECHO)==1:               #Check whether the ECHO is HIGH
    pulse_end = time.time()                #Saves the last known time of HIGH pulse 

  pulse_duration = pulse_end - pulse_start #Get pulse duration to a variable

  distance = pulse_duration * 17150        #Multiply pulse duration by 17150 to get distance
  distance = round(distance, 2)            #Round to two decimal points
#  GPIO.output(STATUS,False)
#if var < 200:
#   print "Expression value is less than 200"
#   if var == 150:
#      print "Which is 150"
  if distance < 50:      #Check whether the distance is within range
     print "Distance:",distance - 0.5,"cm"  #Print distance with 0.5 cm calibration
     print "value : ",GPIO.input(STATUS)
     if GPIO.input(STATUS)==0:
       GPIO.output(STATUS,True)
       print "Space:",GPIO.input(STATUS)
  else:
    print "Out Of Range"                   #display out of range
#    if GPIO.input(STATUS)==0:
    GPIO.output(STATUS,False)
