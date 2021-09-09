x=1
while [ $x -le 1000 ]
do
  echo -e "\nRequest number $x"
  curl --write-out %{http_code} --silent --output /dev/null http://localhost:4000/api/users
  x=$(( $x + 1 ))
done