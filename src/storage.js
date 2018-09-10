import { format, getKeys, getValues } from '../lib/uilts';

class SyncStore {
    constructor(key) {
        this.key = typeof key === 'string' ? key + ':' : 'DEFAULTl:';
    }
    // get 方法
    get(key) {
        if (!key) {
            return Promise.resolve(getValues(this.key));
        }
        const _key = this.key + key;
        try {
            const _val = localStorage[_key];
            if (_val) {
                return Promise.resolve(JSON.parse(_val).value);
            }
            return Promise.reject(undefined);
        } catch (error) {
            return Promise.reject(undefined);
        }
    }
    // 在单元内添加一条记录
    set(key, value) {
        if (!key) return Promise.reject('Lack of key!');
        const _key = this.key + key;

        const saveObj = format(value);
        try {
            localStorage[_key] = saveObj;
            return Promise.resolve(saveObj);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    // 删除单元内单个存储
    remove(key) {
        if (!key) return Promise.reject('Lack of key!');
        const _key = this.key + _key;
        try {
            localStorage.removeItem(_key);
            return Promise.resolve(1);
        } catch (error) {
            return Promise.reject(error || 0);
        }
    }
    // 清理单元内所有存贮
    clear() {
        try {
            const ls = localStorage;
            const keys = getKeys(ls, this.key);
            for (const key of keys) {
                localStorage.removeItem(key);
            }
            return Promise.resolve(1);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    // 是否存在
    has(key) {
        const _key = this.key + key;
        const _val = localStorage[_key];
        const hasVal = !!JSON.parse(_val).value;
        return !!(_val && hasVal);
    }
}

export default SyncStore;