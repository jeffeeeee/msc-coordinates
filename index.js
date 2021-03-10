const memoryjs = require('memoryjs');
const processName = "mysummercar.exe";

const offsetsX = [
  0x50,
  0x40,
  0x60,
  0x90,
  0x0,
  0x20,
  0x280
]

const offsetsZ = [
  0x50,
  0x40,
  0x60,
  0x90,
  0x0,
  0x20,
  0x288
]

memoryjs.openProcess(processName, (error, processObject) => {
  if (error) throw new Error(error)
  console.log(processName, processObject)
  var modules = memoryjs.getModules(processObject.th32ProcessID);
  console.log(modules[0].th32ModuleID, modules[0].szModule,  modules[0].modBaseAddr)

  const address = modules[0].modBaseAddr + 0x010757E8
  // console.log(0x010757E8)
  console.log("Address", address)
  const one = memoryjs.readMemory(processObject.handle, address, memoryjs.INT);

  // const eka = memoryjs.readMemory(processObject.handle, address + offsets[0], memoryjs.FLOAT);
  // console.log(eka, address + 0x50)
  setInterval(() => {
    const X = readValue(offsetsX, memoryjs.FLOAT, one, processObject.handle)
    const Z = readValue(offsetsZ, memoryjs.FLOAT, one, processObject.handle)
    console.log(X, Z)
  }, 2000);
});


function readValue(offsets, type, modBaseAddr, handle) {
  let address = modBaseAddr;
  for (let i = 0; i < offsets.length - 1; i++) {
    address = memoryjs.readMemory(handle, address + offsets[i], memoryjs.PTR);
  }

  let value = memoryjs.readMemory(handle, address + offsets[offsets.length - 1], type);
  return value;
}
// <?xml version="1.0" encoding="utf-8"?>
// <CheatTable>
//   <CheatEntries>
//     <CheatEntry>
//       <ID>21</ID>
//       <Description>"pointerscan result"</Description>
//       <LastState Value="-9.198564529" RealAddress="40D3CF30"/>
//       <VariableType>Float</VariableType>
//       <Address>"mysummercar.exe"+010757E8</Address>
//       <Offsets>
//         <Offset>280</Offset>
//         <Offset>20</Offset>
//         <Offset>0</Offset>
//         <Offset>90</Offset>
//         <Offset>60</Offset>
//         <Offset>40</Offset>
//         <Offset>50</Offset>
//       </Offsets>
//     </CheatEntry>
//   </CheatEntries>
// </CheatTable>
