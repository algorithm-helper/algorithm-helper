#!/bin/bash

session="ah-dev"

tmux start-server

tmux new-session -d -s $session -n "Info"
tmux select-window -t $session:0
tmux send-keys "./scripts/show-info.sh" C-m

tmux new-window -t $session:1 -n "Server"
tmux select-window -t $session:1
tmux send-keys "./scripts/server-dev.sh" C-m

tmux new-window -t $session:2 -n "Client"
tmux select-window -t $session:2
tmux send-keys "./scripts/client-dev.sh" C-m

tmux new-window -t $session:3 -n "MongoDB Shell"
tmux select-window -t $session:3
tmux send-keys "./scripts/mongodb-shell.sh" C-m

tmux select-window -t $session:0

tmux attach-session -t $session
