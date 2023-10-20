const csv = require('csv-parser')


const { StandardMerkleTree } = require("@openzeppelin/merkle-tree");

const fs = require("fs");
const results = [];

let merkleProof;
let merkleRoot;
let proof;

fs.createReadStream('teamFinance.csv')
    .pipe(csv())
    .on('data', (data) => {
        const row = [
            data.Index,
            data.Address,
            data.Amount,
            data.StartTime,
            data.EndTime,
            data.Candence,
            data.PercentageOnStart,
        ];
        results.push(row);
    })
    .on('end', () => {

        const mergedValues = results;
        console.log(mergedValues);
        const tree1 = StandardMerkleTree.of(mergedValues, ["uint256", "address", "uint256", "uint256", "uint256", "uint256", "uint256"]);
        merkleRoot = tree1.root;
        console.log('Merkle Root:', tree1.root);


        fs.writeFileSync("tree.json", JSON.stringify(tree1.dump()));

    });


const tree = StandardMerkleTree.load(JSON.parse(fs.readFileSync("tree.json", "utf8")));

for (const [i, v] of tree.entries()) {
    if (v[0] === '1') {

        proof = tree.getProof(i);
        console.log('Value:', v);
        console.log('Proof:', proof);
    }
    merkleProof = proof;
}


module.exports = {
    merkleProof
};

