const NodeMediaServer = require('node-media-server');
const mysql = require("mysql2");
require("dotenv").config();

const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env;

const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to database!");
  }
});

function startStream(streamKeys) {
  streamKeys.forEach((streamKey) => {
    const config = {
      rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 60,
        ping_timeout: 30,
        publish: [
          { 
            // specify the stream key for this instance
            // the stream key is used as the endpoint for the RTMP stream
            // e.g. rtmp://localhost/live/test
            key: streamKey, 
            // allow all clients to publish to this stream
            mode: 'push'
          }
        ]
      },
      http: {
        port: 8000,
        allow_origin: '*'
      },
    };
  
    const nms = new NodeMediaServer(config);
  
    nms.on('prePublish', (id, StreamPath, args) => {
      console.log(`[${streamKey}] New stream started: ${StreamPath}`);
    });
  
    nms.on('donePublish', (id, StreamPath, args) => {
      console.log(`[${streamKey}] Stream stopped: ${StreamPath}`);
    });
  
    nms.run();
  });
}

// example usage
startStream(['stream']);
