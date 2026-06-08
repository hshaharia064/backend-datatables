import express from "express";
import fs from "fs";
import { json } from "stream/consumers";

const app = express();

// Routes---------------------------------------

// write file
app.get("/write-file", (req, res) => {
  // first param is path, second is content inside that file, and third is error callback
  fs.writeFile("./public/output.txt", "This is a test message", (err) => {
    if (err) {
      return res.status(500).send("Unable to write file");
    }

    res.send("file written successfully");
  });
});

// Reade file
app.get("/read-file", (req, res) => {
  fs.readFile("./public/output.txt", (err, data) => {
    if (err) {
      return res.status(500).send("File not found");
    }

    return res.send(data);
  });
});

// Append file
app.get("/append-file", (req, res) => {
  fs.appendFile(
    "./public/output.txt",
    "\nThis is an appended new text",
    (err) => {
      if (err) {
        return res.status(500).send("Unable to append text");
      }
      res.send("New text added ");
    },
  );
});

// Unlink(delete file)
app.get("/delete-file", (req, res) => {
  fs.unlink("./public/output.txt", (err) => {
    if (err) {
      return res.status(500).send("Unable to delete file");
    }
  });
  res.send("file has been deleted");
});

// Read dir/folder

app.get("/read-folder", (req, res) => {
  fs.readdir("./public", (err, files) => {
    if (err) {
      console.log(err);
      return;
    }
    files.forEach((file) => {
      console.log(file);
    }); //files param gives an arrray of files
    res.send("Files are shown in the console");
  });
});

// Rename file
app.get("/rename-file", (req, res) => {
  fs.rename("./public/output.txt", "./public/renamedOutput.txt", (err) => {
    if (err) {
      return res.status(500).send("file was not renamed");
    }

    res.send("The fille has been renamed successfully");
  });
});

// stream creation for lower memory usage in the server

app.get("/stream-read", (req, res) => {
  const fileStream = fs.createReadStream("./public/renamedOutput.txt");
  fileStream.on("open", () => {
    fileStream.pipe(res);
  });

  fileStream.on("error", () => {
    return res.status(500).send("Error streaming file");
  });
});

// Folder creation
app.get("/create-dir", (req, res) => {
  fs.mkdir("./public/NewFolder", (err) => {
    if (err) {
      return res.status(500).send("Error creating folder");
    }

    res.send("Folder created successfully");
  });
});

// Folder rename

app.get("/rename-dir", (req, res) => {
  fs.rename("./public/NewFolder", "./public/renamedFolder", (err) => {
    if (err) {
      return res.status(500).send("Error renaming folder");
    }

    res.send("folder renamed successfully");
  });
});

// Delete folder

app.get("/delete-folder", (req, res) => {
  fs.rmdir("./public/renamedFolder", (err) => {
    if (err) {
      return res
        .status(500)
        .send("Folder not found or unable to delete folder");
    }

    res.send("folder deleted successfully");
  });
});

// raeding pdf file

app.get("/read-pdf", (req, res) => {
  fs.readFile("./public/js-handbook.pdf", (err, data) => {
    if (err) {
      return res.status(500).send("Unable to read file");
    }

    res.setHeader("Content-Type", "application/pdf");
    res.send(data);
  });
});

// Read json

app.get("/read-json", (req, res) => {
  const jsonStream = fs.createReadStream("./public/data.json");
  jsonStream.on("open", () => {
    jsonStream.pipe(res);
  });

  jsonStream.on("error", () => {
    return res.status(500).send("Json was not found");
  });
});

// Write json

app.get("/write-json", (req, res) => {
  const data = {
    id: 1,
    username: "user_1",
    email: "user1@example.com",
    full_name: "User 1 Name",
    is_active: false,
    roles: "admin",
  };

  fs.writeFile("./public/data.json", JSON.stringify(data), (err) => {
    if (err) {
      return res.status(500).send("Unable to write json");
    }

    res.send("Json written succesfully");
  });
});

// Append json data

app.get("/append-json", (req, res) => {
  const newData = {
    id: 2,
    username: "user_2",
    email: "user2@example.com",
    full_name: "User 2 Name",
    is_active: false,
    roles: "user",
  };
  // 1. Read json(fetch)
  // 2. convert to js obj
  // 3. make new array , push to new array
  // 4. write file again to send new array
  fs.readFile("./public/data.json", (err, data) => {
    if (err) {
      return res.status(500).send("Unable to write file");
    }

    let jsonData;
    jsonData = JSON.parse(data);

    if (!Array.isArray(jsonData)) {
      jsonData = [jsonData];
    }

    jsonData.push(newData);

    fs.writeFile("./public/data.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        return res
          .status(500)
          .send("Something went wrong while appending data");
      }

      res.send("Json data appended");
    });
  });
});

// Read image
app.get("/read-img", (req, res) => {
  fs.readFile("./public/resume.jpg", (err, data) => {
    if (err) {
      return res.status(500).send("Something went wrong while appending data");
    }

    res.setHeader("Content-Type", "image/jpg");
    res.send(data);
  });
});

// Read video

app.get("/read-video", (req, res) => {
  fs.readFile("./public/video.mp4", (err, data) => {
    if (err) {
      return res.status(500).send("Something went wrong while appending data");
    }

    res.setHeader("Content-Type", "video/mp4");
    res.send(data);
  });
});

// get file info
app.get("/read-stats", (req, res) => {
  fs.stat("./public/video.mp4", (err, stat) => {
    if (err) {
      return res.status(500).send("Something went wrong while appending data");
    }

    res.send(stat);
    console.log("File : ", stat.isFile());
    console.log("Folder : ", stat.isDirectory());
  });
});

// access file
app.get("/file-access", (req, res) => {
  fs.stat("./public/video.mp4", (err, stat) => {
    if (err) {
      return res
        .status(500)
        .send("Something went wrong while accessing the file");
    }

    res.send("File found");
    console.log("File : ", stat.isFile());
    console.log("Folder : ", stat.isDirectory());
  });
});

// server start-----------------------------------
app.listen(5000, () => {
  console.log("Express is running...");
});
