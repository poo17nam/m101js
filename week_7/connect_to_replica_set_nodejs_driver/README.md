# Creating and Configuring Replica Set in Mongo Shell

1. Crete db paths for all the three nodes
```
$ mkdir /data/db/rs1
$ mkdir /data/db/rs2
$ mkdir /data/db/rs3
```

2. Run three nodes on different ports with different db paths specifying the name of replica set for each node.
```
$ mongod --port 30001 --replSet replica_set --dbpath /data/db/rs1
$ mongod --port 30001 --replSet replica_set --dbpath /data/db/rs2
$ mongod --port 30001 --replSet replica_set --dbpath /data/db/rs3
```

3. Note down the host for each node which will further be used for setting up the replica set i.e. connecting the nodes amongst each other.

```
2018-07-14T12:51:19.139+0530 I CONTROL  [initandlisten] MongoDB starting : pid=5129 port=30002 dbpath=/data/db/rs2 64-bit host=localhost.localdomain
```

4. Start a single node from the three and initiate the replica set creation process inside Mongo shell. Add the other two nodes and the primary would be automatically selected.

```
$ mongo localhost:30001

> rs.status()
> rs.initiate()
> rs.add("localhost.localdomain:30002")
> rs.add("localhost.localdomain:30003")
```

Now, we have added all our nodes to our replica set. If we look at rs.status() we will see that we have all of our nodes connected.
