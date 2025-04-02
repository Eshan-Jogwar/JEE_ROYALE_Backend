import Dgram from "dgram"

const server = Dgram.createSocket("udp4");

server.on("message", (msg, rinfo) => {
    console.log(`msg: ${msg} , rinfo: ${rinfo}`);
})

server.on("listening", () => {
    console.log("server currently listening.....");
})

server.on("error", (err) => {
    console.log(err);
})

server.bind(14356); 