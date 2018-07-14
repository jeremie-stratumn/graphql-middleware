# Remote example

Start the remote schema:
```
yarn start:remote
```

Start the main schema:
```
yarn start:main
```

Open the main playground on `localhost:4000` and run the following query:
```
{
	hello
  world
}
```

Observe the following output:
```
{
  "data": {
    "hello": "Parent is undefined",
    "world": "Parent is foo"
  }
}
```

which shows that middleware works properly for the world query but not for the hello one.