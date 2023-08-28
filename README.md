# PokeLens

The idea is to create a smart contract that rewards you with an evolved NFT if you accomplish the checkpoints.

Article: [Understanding LensAPI-Oracle By Phala Network](https://0xkeshav.hashnode.dev/understanding-lensapi-oracle-by-phala-network)

Contract: https://github.com/keshavsharma25/PokeLens-Contract

Attestor-Address: 0x6888a2b5d5b5276e3702bf2dc8d61df5c3e0092d

## Introduction

<p align="center">
<img src="https://github.com/miralsuthar/poke-lens/assets/76066586/1c045a71-a16f-4b9d-a091-448285f916a1">
</p>

There are 4 different categories of Pokemon:
- Floraforge (Grass)
- Aquatide (Water)
- Pyroflame (Fire)
- Volttide (Electricity)

<p align="center">
<img src="https://github.com/miralsuthar/poke-lens/assets/76066586/efe7e31e-690b-4e45-9279-03b1b7edc4f3">
</p>

Each category has 3 different levels:
- Level 0 is the bare minimum that can be claimed by an account if the Lens Profile has less than 10 total followers, 50 total posts, 50 total comments, 10 total mirrors, and 10 total collects.
- Level 1 can evolve from the prior if the profile is in the range of 10-50 total followers, 50-100 total posts and comments, and 10-20 total mirrors and collects.
- Level 2 can be acquired if the profile is above 50 total followers, 100 total posts and comments, and 20 total mirrors and collects.

The image below shows different kinds of NFT you get if you choose a particular Pokemon category through a Quiz provided you have a Lens Profile. Then based on your followers, posts, comments, mirrors, and collections, you can get the NFT of a particular level of the category you got through the quiz.



We tried taking an innovative approach to getting the features from Oracle (explained further in article). 

Our transform function is 
```js
function transform(arg) {
  let input = JSON.parse(arg);
  const totalFollowers = input.data.profile.stats.totalFollowers;
  const totalPosts = input.data.profile.stats.totalPosts;
  const totalComments = input.data.profile.stats.totalComments;
  const totalMirrors = input.data.profile.stats.totalMirrors;
  const totalCollects = input.data.profile.stats.totalCollects;

  let finalNumber = "";
  const features = [totalFollowers, totalPosts, totalComments, totalMirrors, totalCollects];

  for (const feature of features) {
    const featString = String(feature).length;
    finalNumber += featString;
    finalNumber += String(feature);
  }

  return Number(finalNumber);
}
```

---
**Note** - Due to some sort of error, because of the contract interaction with the NFT, we were not able to complete the whole project and as we wanted to submit something along the way, we have submitted our learnings through his article as well (mentioned above).
