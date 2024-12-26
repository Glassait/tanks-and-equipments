echo "Delete generated api"
rm -rf ./projects/fold/src/generated-api

echo "Sleeping !"
sleep 5
echo "Wake Up !"

./open-api/tanks/generate-tanks-api.sh
./open-api/wot/generate-wot-api.sh
./open-api/fold/generate-fold-api.sh