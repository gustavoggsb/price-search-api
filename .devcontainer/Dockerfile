# Note: You can use any Debian/Ubuntu based image you want.
FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu

# script-library options
ARG SCRIPT_LIBRARY_COMMIT=master

# script-library's node options
ENV NVM_DIR="/usr/local/share/nvm"
ENV NVM_SYMLINK_CURRENT=true \
  PATH=${NVM_DIR}/current/bin:${PATH}

# Install stuff using script-library's scripts
RUN SCRIPT_LIBRARY_URL=https://raw.githubusercontent.com/microsoft/vscode-dev-containers/${SCRIPT_LIBRARY_COMMIT}/script-library \
  # Install node
  && bash -c "$(curl -fsSL "$SCRIPT_LIBRARY_URL/node-debian.sh")" -- "${NVM_DIR}" \
  # Clean up
  && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/* /tmp/library-scripts/
