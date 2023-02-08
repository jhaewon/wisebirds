function handler(req, res) {
  const eventId = res.query.eventId;

  if (req.method === "POST") {
    //add server side validation
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
        res.stutus(422).json({message:'Invalid input'});
        return;
    }

    const newComment = {
        id:new Date().toISOString,
        email,
        name,
        text
    };
    console.log(newComment);

    res.status(201).json({message: 'Added comment', comment : newComment});
  }
  

  if (req.method === "GET") {
    const dummyList =[
        {
            id:'v1',
            name:'ma',
            email:'test@test.com',
            text:'comment 1'
        },
        {
            id:'v2',
            name:'na',
            email:'test@test.com',
            text:'comment 2'
        }
    ];

    res.status(200).json({comments: dummyList});
  }
}

export default handler;
