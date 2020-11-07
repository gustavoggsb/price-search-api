FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu20.04

SHELL [ "bash", "-euxo", "pipefail", "-c" ]

# Fix 'sudo: setrlimit(RLIMIT_CORE): Operation not permitted'
# See https://github.com/sudo-project/sudo/issues/42#issuecomment-609079906
RUN echo "Set disable_coredump false" >> /etc/sudo.conf

USER vscode

WORKDIR /home/vscode

# Install GitHub CLI
RUN DEB_URL=$(curl -fsSL https://api.github.com/repos/cli/cli/releases/latest | jq -er '.assets[].browser_download_url | select(. | contains("linux_amd64.deb"))'); \
   DEB_FILE=gh_latest.deb; \
   curl -fsSLo $DEB_FILE $DEB_URL; \
   sudo DEBIAN_FRONTEND=noninteractive apt-get install -y ./$DEB_FILE; \
   rm -f $DEB_FILE; \
   gh --version; \
   #
   sudo rm -rf /var/lib/apt/lists/*

# Install Node.JS 12
RUN export DEBIAN_FRONTEND=noninteractive; \
   curl -fsSL https://deb.nodesource.com/setup_12.x | sudo -E bash; \
   sudo -E apt-get install -y nodejs; \
   #
   sudo rm -rf /var/lib/apt/lists/*

RUN sudo npm install -g @nestjs/cli commitizen heroku