import React, { useEffect, useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import LinkContainer from "../component/LinkContainer/LinkContainer";
import classes from "../../styles/Links/Links.module.css";
import db, { auth, firebaseApp } from "../../Firebase_config/firebase";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import firebase from "firebase";

const Link = () => {
  const [links, setlinks] = useState([]);

  useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("links")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setlinks(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);



  const LinkAddHandler = () => {
    db.collection("users")
    .doc(auth.currentUser.uid)
    .collection("links")
    .add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const setLinkData = (title, url, index, timestamp, checked) => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("links")
      .doc(index)
      .set({                                
        timestamp: timestamp,
        title: title,
        url: url,
        isactive: checked,
      });
  };

  const onLinkDelete = (id) => {
    links.map((link) => {
      if (link.id === id) {
        db.collection("users")
          .doc(auth.currentUser.uid)
          .collection("links")
          .doc(link.id)
          .delete();
      }
    });
  };


  
  const reorder = (links, startIndex, endIndex) => {
    const result = Array.from(links);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleOnDragEnd = (result) => {
  //   links.map((link)=>{
  //  const dd=link.id
  //     db.collection("users")
  //     .doc(auth.currentUser.uid)
  //     .collection("links")
     
  //     .update({
  //       setlinks(links)
  //     });
  //     console.log(update)
  //   })


    
    if (!result.destination) {
      return;
    }

    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
       return;
    }

    const draggedItem = links[result.source.index];
    links.splice(result.source.index, 1);
    links.splice(result.destination.index, 0, draggedItem);
    setlinks(links);

//     console.log(links)


// console.log(result);


  };
  return (
    <div className={classes.link_body}>
      <button className="btn btn-primary w-100 p-3" onClick={LinkAddHandler }>
                          
        Add Link
    </button>
      <header className="App-header">
    
        <DragDropContext  onDragEnd={handleOnDragEnd}>
      
          <Droppable droppableId="droppable-1">
            {(provided) => (
              <div
                ref={provided.innerRef}               
                {...provided.droppableProps}
              >
                {links.map((link, index) => {
                  return (
                    <Draggable key={link.id} draggableId={"draggable-" + link.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <LinkContainer
                          index={link.index}
                            key={link.id}
                            id={link.id}
                            linkData={setLinkData}
                            onDelete={onLinkDelete}
                            title={link.data.title}
                            url={link.data.url}
                            timestamp={link.data.timestamp}
                            isactive={link.data.isactive}
                          />

                        </div>
                      )}
</Draggable>
                  );

                })}
                 {provided.placeholder}
              </div>
            )}

          </Droppable>

        </DragDropContext>
      </header>

    </div>
  );
}
export default Link;

// import React, { useEffect, useState } from "react";
// import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import LinkContainer from "../component/LinkContainer/LinkContainer";
// import classes from "../../styles/Links/Links.module.css";
// import db, { auth, firebaseApp } from "../../Firebase_config/firebase";
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import firebase from "firebase";

// const Link = () => {
//   const [links, setlinks] = useState([]);

//   useEffect(() => {
//     db.collection("users")
//       .doc(auth.currentUser.uid)
//       .collection("links")
//       .orderBy("timestamp", "desc")
//       .onSnapshot((snapshot) =>
//         setlinks(
//           snapshot.docs.map((doc) => ({
//             id: doc.id,
//             data: doc.data(),
//           }))
//         )
//       );
//   }, []);

//   const LinkAddHandler = () => {
//     db.collection("users").doc(auth.currentUser.uid).collection("links").add({
//       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//     });
//   };

//   const setLinkData = (title, url, index, timestamp, checked) => {
//     db.collection("users")
//       .doc(auth.currentUser.uid)
//       .collection("links")
//       .doc(index)
//       .set({
//         timestamp: timestamp,
//         title: title,
//         url: url,
//         isactive: checked,
//       });
//   };

//   const onLinkDelete = (id) => {
//     links.map((link) => {
//       if (link.id === id) {
//         db.collection("users")
//           .doc(auth.currentUser.uid)
//           .collection("links")
//           .doc(link.id)
//           .delete();
//       }
//     });
//   };

//   function handleOnDragEnd(result) {
//     if (!result.destination) return;
//     const items = Array.from(links);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);
//     setlinks(items);
//   }

//   return (
//     <div className={classes.link_body}>
//       <button className="btn btn-primary w-100 p-3" onClick={LinkAddHandler}>
//         Add Link
//     </button>
//       <header className="App-header">
//         <DragDropContext onDragEnd={handleOnDragEnd}>
//           <Droppable droppableId="characters">
//             {(provided) => (
//               <div className="characters" {...provided.droppableProps} ref={provided.innerRef}>
//                 {links.map(({ id }, index1) => {

//                   return (
//                     <Draggable key={id} draggableId={id} index={index1}>
//                       {(provided) => (
//                         <div
//                           ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>

//                           {links.map((link,index2) => {
//                             if(index1==index2){
//                             return (
//                               <LinkContainer
//                                 key={link.id}
//                                 id={link.id}
//                                 linkData={setLinkData}
//                                 onDelete={onLinkDelete}
//                                 title={link.data.title}
//                                 url={link.data.url}
//                                 timestamp={link.data.timestamp}
//                                 isactive={link.data.isactive}
//                               />
//                             );
//                             }
//                           })}
//                         </div>
//                       )}
//                     </Draggable>
//                   );
//                 })}

//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         </DragDropContext>
//       </header>

//     </div>
//   );
// }
// export default Link;
