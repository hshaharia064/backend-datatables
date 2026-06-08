import express from "express";
import fs from "fs";

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

app.get("/rename-file", (req, res) => {
  fs.rename("./public/output.txt", "./public/renamedOutput.txt", (err) => {
    if (err) {
      return res.status(500).send("file was not renamed");
    }

    res.send("The fille has been renamed successfully");
  });
});

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

app.get("/read-pdf", (req, res) => {
  fs.readFile("./public/js-handbook.pdf", (err, data) => {
    if (err) {
      return res.status(500).send("Unable to read file");
    }

    res.setHeader("Content-Type", "application/pdf");
    res.send(data);
  });
});

// server start-----------------------------------
app.listen(5000, () => {
  console.log("Express is running...");
});
