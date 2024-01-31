import { Rekognition } from '@aws-sdk/client-rekognition'
import { readFileSync } from 'fs'
import { config } from 'dotenv'
config()

const rekognition = new Rekognition({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
    region: 'ap-south-1',
});

async function compareFaces(pathA, pathB) {
    try {
        var file1 = readFileSync(pathA)
        var file2 = readFileSync(pathB)
        var response = await rekognition.compareFaces({
            SourceImage: { Bytes: file1 },
            TargetImage: { Bytes: file2 },
        });
        var confidence = response?.FaceMatches[0]?.Similarity
        if (confidence) return confidence
        else return null;
    }
    catch (e) {
        console.error(e)
        return null
    }
}

var confidenceScore = await compareFaces('./images/one.jpeg', './images/two.jpg');
console.log(confidenceScore)