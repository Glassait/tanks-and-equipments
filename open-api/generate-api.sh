echo "Delete generated api"
rm -rf ./src/generated-api

./open-api/tanks/generate-tanks-api.sh
./open-api/wot/generate-wot-api.sh
./open-api/fold/generate-fold-api.sh