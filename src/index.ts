import express, { Request, Response } from "express";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/upsertAddress", async (req: Request, res: Response) => {
  const { contractAddress } = req.body;

  if (!contractAddress) {
    return res.status(400).send("Bad Request: contractAddress is required");
  }

  const credId = "123"; // Example credential ID
  const operation = "APPEND"; // Example operation
  const items = [contractAddress]; // Use the received contractAddress

  try {
    let result = await axios.post(
      "https://graphigo.prd.galaxy.eco/query",
      {
        operationName: "credentialItems",
        query: `
          mutation credentialItems($credId: ID!, $operation: Operation!, $items: [String!]!) 
          { 
            credentialItems(input: { 
              credId: $credId, 
              operation: $operation, 
              items: $items 
            }) 
            { 
              name 
            } 
          }
        `,
        variables: {
          credId: credId,
          operation: operation,
          items: items,
        },
      },
      {
        headers: {
          "access-token": process.env.GALXE_ACCESS_TOKEN_c2F6, // Replace with your access token
        },
      }
    );

    if (result.status !== 200) {
      throw new Error(`HTTP error: ${result.status}`);
    } else if (result.data.errors && result.data.errors.length > 0) {
      console.log(result.data.errors);
      throw new Error("GraphQL error: " + JSON.stringify(result.data.errors));
    }

    res.status(200).json(result.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
