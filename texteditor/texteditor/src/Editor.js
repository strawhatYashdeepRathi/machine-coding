import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import { Box } from "@mui/material";
import "quill/dist/quill.snow.css";
import "./Editor.css";
import { useParams } from "react-router-dom";

import {io} from 'socket.io-client';

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

function Editor() {
  const [sock, setSock] = useState();
  const [quill, setQuill] = useState();
  const { id } = useParams();

  const wrappRef = useCallback((wrapper) => {
    if (wrapper === null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const quillServer = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: toolbarOptions },
    });
    quillServer.disable();
    quillServer.setText('Loading your document. Please wait for a while ....')
    setQuill(quillServer)
  }, []);

  useEffect(()=> {
    const socketServer = io('http://localhost:9000');
    setSock(socketServer)
    return () => {
      socketServer.disconnect();
    }
  }, [])

  // sending changes to server

  useEffect(()=>{
    if (sock === null || quill === null) return

    const handleChange = (delta, oldData, source) => {
      if (source !== 'user') return;

      sock && sock.emit('send-changes', delta);
    }
    quill && quill.on('text-change', handleChange)
    return () => {
      quill && quill.off('text-change', handleChange)
    }
  }, [quill, sock])

  // recieveinbg and broadcasting changes to all the quill editors

  useEffect(()=>{
    if (sock === null || quill === null) return

    const handleChange = (delta, oldData, source) => {
      quill.updateContents(delta)
    }
    sock && sock.on('recieve-changes', handleChange)
    return () => {
      sock && sock.off('text-change', handleChange)
    }
  }, [quill, sock])

  useEffect(()=> {
    if (quill === null || sock === null) return;

    sock && sock.once('load-document', document => {
      quill && quill.setContents(document);
      quill && quill.enable();

    })

    sock && sock.emit('get-document', id);
  }, [quill, sock, id])

  useEffect(()=> {
    if (sock === null || quill === null) return

    const interval = setInterval(() => {
      sock && sock.emit('save-document', quill.getContents())
    }, 2000)

    return () => {
      clearInterval(interval);
    }
  }, [sock, quill])

  return (
    <Box className="editor-container">
      <Box id="container" className="editor-inner" ref={wrappRef}></Box>
    </Box>
  );
}

export default Editor;
