#Lazy URL Shortening

Currently encoding truncated timestamp into base62 for the shortened url, causes collision if >1 url submitted per ms.
Further options:
    1. Counter doc in db(probably the best)
    2. ObjID usage?
    3. Truncated hash?