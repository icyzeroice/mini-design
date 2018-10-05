const AsyncMode = 1
const StrictMode = 2
const NoContext = 0


function ReactDOM_render(element, container, callback) {
  return _legacyRenderSubtreeIntoContainer(null, element, container, false, callback)
}

function ReactDOM_hydrate() {
  return _legacyRenderSubtreeIntoContainer(null, element, container, true, callback)
}

function _legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {
  // TODO: 检测 container 节点类型
  let root = container._reactRootContainer
  if (!root) {
    // initial mount
    root = container._reactRootContainer = _legacyCreateRootFromDOMContainer(container, forceHydrate)
  }

  // TODO: 这里有跟批量更新有关的 unbatchedUpdates 方法调用
  if (parentComponent != null) {
    root._legacy_renderSubtreeIntoContainer(parentComponent, children, callback)
  } else {
    root.render(children, callback)
  }
}

function _legacyCreateRootFromDOMContainer(container, forceHydrate) {
  // TODO: 如果有非 react 创建的子节点，这里要用 lastChild 一个个 removeChild
  return new ReactRoot(container, false, shouldHydrate)
}


/**
 * @class ReactRoot
 */
function ReactRoot(containerInfo, isAsync, shouldHydrate) {
  let root = createFiberRoot(containerInfo, isAsync, hydrate)
  this._internalRoot = root
}

ReactRoot.prototype.render = function (children, callback) {
  // 内部根节点的引用
  let root = this._internalRoot
  _updateContainer(null, root, null)
}

function _updateContainer(element, container, parentComponent, callback) {
  let current= container.current
  return _updateContainerAtExpirationTime(element, container, parentComponent)
}
function _updateContainerAtExpirationTime(element, container, parentComponent) {
  let current = container.current
  // let context = getContextForSubtree(parentComponent)
  let context = {}

  if (container.context === null) {
    container.context = context
  } else {
    container.pendingContext = context
  }
}

function _scheduleRootUpdate(current, element, /* expirationTime, callback */) {

}
function createUpdate(expirationTime) {
  return {
    expirationTime: expirationTime,

    tag: UpdateState,
    payload: null,
    callback: null,

    next: null,
    nextEffect: null
  };
}



function createFiberRoot(containerInfo, isAsync, hydrate) {
  let uninitializedFiber = new FiberNode(HostRoot, null, null, isAsync ? AsyncMode | StrictMode : NoContext)
  
  let root = {
    current: uninitializedFiber,
    containerInfo: containerInfo,
    pendingChildren: null,

    // earliestPendingTime: NoWork,
    // latestPendingTime: NoWork,
    // earliestSuspendedTime: NoWork,
    // latestSuspendedTime: NoWork,
    // latestPingedTime: NoWork,

    // pendingCommitExpirationTime: NoWork,
    // finishedWork: null,
    context: null,
    pendingContext: null,
    hydrate: hydrate,
    // remainingExpirationTime: NoWork,
    // firstBatch: null,
    // nextScheduledRoot: null
  }

  uninitializedFiber.stateNode = root // stateNode 这里只是暂时这样赋

  return root
}

/**
 * @class FiberNode
 */
function FiberNode(tag, pendingProps, key, mode) {
  // Instance
  this.tag = tag
  this.key = key
  this.type = null
  this.stateNode = null

  // Fiber
  this.return = null
  this.child = null
  this.sibling = null
  this.index = 0

  this.ref = null

  this.pendingProps = pendingProps
  this.memorizedProps = null
  this.updateQueue = null
  this.memorizedState = null

  this.mode = mode
  
  // Effect
  // this.effectTag = NoEffect
  // this.nextEffect = null
  
  // this.firstEffect = null
  // this.nextEffect = null

  // this.expirationTime = NoWork

  if (enableProfilerTimer) {
    this.actualDuration = 0
    this.actualStartTime = 0
    this.selfBaseTime = 0
    this.treeBaseTime = 0
  }
}