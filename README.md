**It's imcomplete right now.**

-----

### Overview

**Weibo Bot**, a practice application for data collecting.

It allows you to walk over Weibo, a Twitter-like social network, to collect something interesting.

### Algorithm

It uses **Depth-first Search** as the way of traversing and searching.

DFS Explain on Wikipedia: <http://en.wikipedia.org/wiki/Depth-first_search>

### Storage

Currently, it doesn't save what it discovered.

-----

### How to use?

1. First, you need a pair of **Authorization Code** and **Access Token**.

   <http://t.cn/RvJi6aD>

   In the URL bar, you may see something like this:
      
   [  *http://oauth.weico.cc/?code=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*  ]
   
   The string "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" is your **Authorization Code**.

2. Convert it into **Access Token**
   
   [  *node GetToken.js XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*  ]
   
   Replace "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" with the code you obtained before.
   
   [  *您的Access Token爲 2.00wwwwwwwwwwwwwwwwwwwwwwwwwwww*  ]
   
   "2.00wwwwwwwwwwwwwwwwwwwwwwwwwwww" is your final **Access Token**.

3. Apply to Configuration
   
   See the demo configuration document "Config.sample.json"
   
   **Remember to rename it to "Config.json"**