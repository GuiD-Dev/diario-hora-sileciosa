#! /bin/bash

NOME_BRANCH="deploy-tmp-branch"

quasar build -m pwa
git --work-tree dist/pwa checkout --orphan $NOME_BRANCH
git --work-tree dist/pwa add --all
git --work-tree dist/pwa commit -m new-deploy
git checkout -f deploy
git merge $NOME_BRANCH -X theirs --allow-unrelated-histories
git push origin deploy
git checkout -f master
git branch -D $NOME_BRANCH
