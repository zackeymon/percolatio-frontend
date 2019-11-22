```
docker build ./ -t percolatio
docker run -p 8081:3000 percolatio:latest
docker tag percolatio percolatio/percolatio-frontend:latest
```