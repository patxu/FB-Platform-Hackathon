var util = require('util');
var bleno = require('bleno');
var PrimaryService = bleno.PrimaryService;
var Characteristic = bleno.Characteristic;
var Descriptor = bleno.Descriptor;

var name = 'LoginTest';

var descriptor = new Descriptor({
    uuid: '2901',
    value: 'value' // static value, must be of type Buffer or string if set
});

var characteristic = new Characteristic({
    uuid: 'fffffffffffffffffffffffffffffff1', // or 'fff1' for 16-bit
    properties: [ 'read', 'write' ], // can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
    descriptors: descriptor,
    onReadRequest: function(data, offset, withoutResponse, callback) {
      console.log('Read Request');
    }, // optional read request handler, function(offset, callback) { ... }
    onWriteRequest: function(data, offset, withoutResponse, callback) {
      console.log('Write Request');
    }, // optional write request handler, function(data, offset, withoutResponse, callback) { ...}
    onSubscribe: null, // optional notify/indicate subscribe handler, function(maxValueSize, updateValueCallback) { ...}
    onUnsubscribe: null, // optional notify/indicate unsubscribe handler, function() { ...}
    onNotify: null, // optional notify sent handler, function() { ...}
    onIndicate: null // optional indicate confirmation received handler, function() { ...}
});

var primaryService = new PrimaryService({
    uuid: 'fffffffffffffffffffffffffffffff0', // or 'fff0' for 16-bit
    characteristics: characteristic
});

bleno.on('stateChange', function(state) {
  console.log("blah");
  if (state === 'poweredOn') {
    bleno.startAdvertising(
      'potato',
      [primaryService.uuid]
    );
  }
});

bleno.on('advertisingStart', function(err) {
  if (!err) {
    console.log('Advertising now');
  }
})
