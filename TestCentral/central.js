var noble = require('noble');

var loginServiceUuid = 'fffffffffffffffffffffffffffffff0';


noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    //
    // Once the BLE radio has been powered on, it is possible
    // to begin scanning for services. Pass an empty array to
    // scan for all services (uses more time and power).
    //
    console.log('scanning...');
    noble.startScanning([loginServiceUuid], false);
  }
  else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
  // we found a peripheral, stop scanning
  console.log('Found Peripheral :DDD');
  noble.stopScanning();
});
