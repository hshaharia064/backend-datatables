import express from "express";
import fs from "fs";

const app = express();

// Routes---------------------------------------

// write file
app.get("/write-file", (req, res) => {
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

// server start-----------------------------------
app.listen(5000, () => {
  console.log("Express is running...");
});
