# type-benchmark

A TypeScript type benchmark testing the performance of type alias vs. interfaces.

## Results

![interfaces in trace](https://user-images.githubusercontent.com/58836760/193191825-0dde8460-9cf2-478c-ba2d-95da55d9d663.png)
![type alias in trace](https://user-images.githubusercontent.com/58836760/193191987-5c429855-54dd-4e54-8682-88b2d6d76927.png)

## Reproduce

1.

```sh
pnpm install
```

2.

```sh
pnpm trace
```

3. Go to https://ui.perfetto.dev/ and drop the `trace/trace.json` file in.
